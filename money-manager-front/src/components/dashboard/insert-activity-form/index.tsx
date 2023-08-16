'use client'

import { CustomAlert, CustomAlertType } from "@/components/general/custom-alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { frontendApi } from "@/lib/api";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { data } from "autoprefixer";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

enum ActivityType {
    REVENUE = "revenue",
    EXPENSE = "expense"
}

const insertFormSchema = z.object({
    date: z.date({ required_error: "Insira uma data" }),

    description: z.string({ required_error: "Insira uma descrição" })
        .min(3, { message: "Pelo menos três caracteres" }),

    value: z.coerce.number({ required_error: "Insira um valor" })
        .min(0.01, { message: "Valor deve ser maior que zero" }),

    type: z.nativeEnum(ActivityType, { required_error: "Selecione um tipo" })
});

type InsertFormType = z.infer<typeof insertFormSchema>;

export function InsertActivityForm() {

    const [insertMessage, setInsertMessage] = useState<JSX.Element>(<></>);

    const insertForm = useForm<InsertFormType>({
        resolver: zodResolver(insertFormSchema),
        defaultValues: {
            date: new Date(),
            description: "",
            // @ts-expect-error
            value: "",
            type: ActivityType.REVENUE
        }
    });

    async function onInsertFormSubmit({ date, description, value, type }: InsertFormType) {

        const formatedData = JSON.stringify({
            date: date.toISOString(),
            description,
            value,
            type
        });

        try {

            const result = await frontendApi.post("/activities", formatedData);

            const message = <CustomAlert
                title="Atividade inserida com sucesso!"
                message={`A ${type} foi inserida com sucesso!`}
                type={CustomAlertType.SUCCESS}
                className="w-fit float-right mb-4"
            />

            setInsertMessage(message);

        } catch (e) {
            const axiosError = e as AxiosError;

            const data = axiosError.response?.data as { message: string, code: number };

            var errorMessage;

            if (data) {
                errorMessage = data.message;
            } else {
                errorMessage = axiosError.message;
            }

            setInsertMessage(<>Deu ruim!</>);

            const message = <CustomAlert
                title={`Erro ao inserir a atividade!`}
                message={`${errorMessage}.`}
                type={CustomAlertType.ERROR}
                className="w-fit float-right mb-4"
            />

            setInsertMessage(message);
        }

        setTimeout(() => setInsertMessage(<></>), 2500); // 2,5 seconds

    }

    return (
        <div>
            <Form {...insertForm}>
                <form onSubmit={insertForm.handleSubmit(onInsertFormSubmit)} className="flex space-x-2 p-8 pb-4">
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
                                <FormItem className="w-full">
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
                                <FormItem className="w-max">
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
                                <FormItem className="w-max">
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-max">
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
                {insertMessage}
            </Form>
        </div>
    );
}