import { backendApi } from "@/lib/api";
import { AxiosError } from "axios";
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

async function POST(request: NextRequest) {

    const authToken = request.cookies.get("money-manager.token")?.value;

    if (!authToken)
        return new Response(JSON.stringify(new Error("Usuário não autorizado")), { status: 401 });

    try {

        const data = await request.json() as InsertActivityRequestType;

        const jsonData = JSON.stringify(data);

        const result = backendApi.post("/activities", jsonData, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        return new Response("", { status: 201 });

    } catch (e) {
        const axiosError = e as AxiosError;

        const { status, error } = axiosError.response?.data as BackendResponseErrrorType;

        if(status){
            return new Response(JSON.stringify(error), { status });
        } else {
            return new Response(JSON.stringify(axiosError.message), { status: axiosError.status });
        }
    }
}