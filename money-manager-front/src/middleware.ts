import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {

    const authToken = request.cookies.get("money-manager.token")?.value;

    if (authToken) {

        const isTokenValid = await validateToken(authToken);

        if (isTokenValid)
            return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));

}

export const config = {
    matcher: ['/dashboard']
}

type BackendValidateTokenResponseType = {
    is_valid: boolean;
}

type BackendValidateTokenRequestType = {
    token: string;
}

async function validateToken(token: string) {

    var isValid = false;

    try {
        const response = await fetch("http://localhost:8000/auth/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ token } as BackendValidateTokenRequestType)
        });

        const jsonResponse = await response.json() as BackendValidateTokenResponseType;

        isValid = jsonResponse.is_valid;

    } catch (e) {
        isValid = false;
    }

    return isValid;

}