import { backendApi } from "@/lib/api";
import { AxiosError } from "axios";
import { stat } from "fs";
import { NextRequest } from "next/server";

type BackendResponseErrrorType = {
    timestamp: string;
    status: number;
    error: string;
    path: string
}

type InsertActivityRequestType = {
    date: Date;
    description: string;
    type: "expense" | "revenue";
    value: number
}

export async function POST(request: NextRequest) {

    const authToken = request.cookies.get("money-manager.token")?.value;

    if (!authToken)
        return new Response(JSON.stringify(new Error("Usuário não autorizado")), { status: 401 });

    try {

        const data = await request.json() as InsertActivityRequestType;

        const jsonData = JSON.stringify(data);

        const result = await backendApi.post("/activities", jsonData, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        return new Response("", { status: 201 });

    } catch (e) {
        const axiosError = e as AxiosError;

        const { status, error } = axiosError.response?.data as BackendResponseErrrorType;

        if (status) {
            return new Response(JSON.stringify(new AxiosError(error, status.toString())), { status });
        } else {
            return new Response(JSON.stringify(new AxiosError(axiosError.message, axiosError.code)),
                { status: axiosError.status || 500 });
        }
    }
}

export type ActivityType = {
    id: string;
    date: Date;
    description: string;
    value: number;
    type: "expense" | "revenue";
}

export type ActivitiesType = {
    activities: ActivityType[];
}

export async function GET(request: NextRequest) {
    const authToken = request.cookies.get("money-manager.token")?.value;

    if (!authToken)
        return new Response(JSON.stringify(new Error("Usuário não autorizado")), { status: 401 });

    try {
        const result = await backendApi.get("/activities", {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        const activities = result.data as ActivitiesType;

        return new Response(JSON.stringify(activities), { status: 200 });

    } catch (e) {
        const axiosError = e as AxiosError;

        const { status, error } = axiosError.response?.data as BackendResponseErrrorType;

        if (status) {
            return new Response(JSON.stringify(new AxiosError(error, status.toString())), { status });
        } else {
            return new Response(JSON.stringify(new AxiosError(axiosError.message, axiosError.code)),
                { status: axiosError.status || 500 });
        }
    }
}