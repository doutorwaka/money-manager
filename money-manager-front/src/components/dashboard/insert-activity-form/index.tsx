'use client'

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

enum ActivityType {
    REVENUE = "revenue",
    EXPENSE = "expense"
}

const insertFormSchema = z.object({
    date: z.date(),
    description: z.string(),
    value: z.number(),
    type: z.nativeEnum(ActivityType)
});

type InsertFormType = z.infer<typeof insertFormSchema>;

export function InsertActivityForm() {

    const insertForm = useForm<InsertFormType>({
        resolver: zodResolver(insertFormSchema),
        defaultValues: {
            date: new Date(),
            description: "",
            value: 0,
            type: ActivityType.REVENUE
        }
    });

    return (
        <div className="flex space-x-2 p-8">
            <Form {...insertForm}>
                <FormField
                    control={insertForm.control}
                    name="date"
                    render={({ field }) => {
                        return (
                            <FormItem className="max-w-[10rem]">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-max justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )
                    }}
                />

                <Input type="text" placeholder="Insira a descrição da atividade..." />
                <Input type="number" className="w-max" placeholder="Digite o valor..." />
                <Select>
                    <SelectTrigger className="w-80">
                        <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">Entrada</SelectItem>
                        <SelectItem value="1">Saída</SelectItem>
                    </SelectContent>
                </Select>
                <Button>Incluir</Button>
            </Form>
        </div>
    );
}