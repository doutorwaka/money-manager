import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest){

    const authToken = request.cookies.get("money-manager.token")?.value;

    if(authToken){
        return NextResponse.next();
    }
    else{
        return NextResponse.redirect(new URL("/", request.url));
    }

}

export const config = {
    matcher: ['/dashboard']
}