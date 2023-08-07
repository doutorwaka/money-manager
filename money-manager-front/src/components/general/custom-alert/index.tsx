import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon, CheckIcon } from "lucide-react";

export const enum CustomAlertType {
    SUCCESS = "success",
    ERROR = "error"
}

export type CustomAlertProps = {
    type: CustomAlertType.SUCCESS | CustomAlertType.ERROR;
    title: string;
    message: string;
}

export function CustomAlert({ type, title, message }: CustomAlertProps) {

    const alert = type === CustomAlertType.SUCCESS
        ? <SuccessAlert title={title} message={message} />
        : <ErrorAlert title={title} message={message} />

    return alert;
}

type SuccessAlertProps = {
    title: string;
    message: string
};

function SuccessAlert({ title, message }: SuccessAlertProps) {
    return (
        <Alert className="flex-row border-emerald-500">
            <CheckIcon className="h-8 w-8 stroke-emerald-500" />
            <AlertTitle className="font-bold mx-4">
                {title}
            </AlertTitle>
            <AlertDescription className="font-thin mx-4">
                {message}
            </AlertDescription>
        </Alert>
    )
}

type ErrorAlertProps = {
    title: string;
    message: string
}

function ErrorAlert({ title, message }: ErrorAlertProps) {
    return (
        <Alert className="flex-row border-red-500">
            <AlertTriangleIcon className="h-8 w-8 stroke-red-500" />
            <AlertTitle className="font-bold mx-4">
                {title}
            </AlertTitle>
            <AlertDescription className="font-thin mx-4">
                {message}
            </AlertDescription>
        </Alert>
    )
}