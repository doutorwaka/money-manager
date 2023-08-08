'use client'

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

    }

    function signOut() {

    }

    function recoveryToken() {
        return "";
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, recoveryToken }}>
            {children}
        </AuthContext.Provider>
    )
}