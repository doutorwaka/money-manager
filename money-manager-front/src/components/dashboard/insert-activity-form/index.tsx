'use client'

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
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
    value: z.coerce.number(),
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

    async function onInsertFormSubmit(date: InsertFormType) {
        console.log(date);
    }

    return (
        <div className="flex space-x-2 p-8">
            <Form {...insertForm}>
                <form onSubmit={insertForm.handleSubmit(onInsertFormSubmit)}>
                    <FormField
                        control={insertForm.control}
                        name="date"
                        render={({ field }) => {
                            return (
                                <FormItem className="w-max">
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

                    <FormField
                        control={insertForm.control}
                        name="description"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormControl>
                                        <Input type="text" placeholder="Insira a descrição da atividade..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />

                    <FormField
                        control={insertForm.control}
                        name="value"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormControl>
                                        <Input type="number" className="w-max" placeholder="Digite o valor..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />

                    <FormField
                        control={insertForm.control}
                        name="type"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-80">
                                                <SelectValue placeholder="Selecione o tipo" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={ActivityType.REVENUE}>Entrada</SelectItem>
                                            <SelectItem value={ActivityType.EXPENSE}>Saída</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />
                    <Button type="submit">Incluir</Button>
                </form>
            </Form>
        </div>
    );
}