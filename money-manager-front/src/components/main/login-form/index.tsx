'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BadgeDollarSign } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { frontendApi } from "@/lib/api";
import { LoginResponseType } from "@/app/api/auth/login/route";
import { useState } from "react";

const loginFormSchema = z.object({
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(1, { message: "Senha inválida" })
});

type LoginFormType = z.infer<typeof loginFormSchema>;

export function LoginForm() {

    const [message, setMessage] = useState(<></>);

    const loginForm = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function handleLoginSubmit({ email, password }: LoginFormType) {

        const data = JSON.stringify({
            email,
            password
        });

        try {
            const result = await frontendApi.post("/auth/login", data);

            const { token, error } = result.data as LoginResponseType;

            if (error) {
                setMessage(<p>Deu erro! {error}</p>);
            } else {
                setMessage(<p>Deu certo! {token}</p>);
            }

        } catch (e) {

        }
    }

    return (
        <>
            <div className="flex pb-60 items-center h-screen">
                <div className="container space-y-2 p-8 max-w-md rounded-xl bg-gray-50 shadow-md">
                    <span className="flex items-center gap-2">
                        <BadgeDollarSign className="text-slate-500" size={48} />
                        <h1 className="uppercase text-slate-600 font-bold text-xl">Money Manager</h1>
                    </span>

                    <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-2">
                            {message}
                            <FormField
                                control={loginForm.control}
                                name="email"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="text" placeholder="Digite seu e-mail" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />

                            <FormField
                                control={loginForm.control}
                                name="password"
                                render={({ field }) => {
                                    return (<FormItem>
                                        <FormControl>
                                            <Input type="password" placeholder="Digite sua senha" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)
                                }}
                            />

                            <Button type="submit">Enviar</Button>
                        </form>
                    </Form>

                </div>

            </div>
        </>
    )
}