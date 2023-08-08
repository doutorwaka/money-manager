'use client'

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import React, { createContext } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    signIn: (token: string) => void;
    signOut: () => void;
    recoveryToken: () => string | undefined;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    var isAuthenticated = false;

    function signIn(token: string) {
        setCookie("money-manager.token", token, {
            maxAge: 60 * 60 * 3 // 3 hours
        });
    }

    function signOut() {
        deleteCookie("money-manager.token");
    }

    function recoveryToken() {
        const cookie = getCookie("money-manager.token");
        const token = cookie?.toString();
        return token;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, recoveryToken }}>
            {children}
        </AuthContext.Provider>
    )
}