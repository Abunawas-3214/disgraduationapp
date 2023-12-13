'use client'
import * as React from "react"
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import ContextProvider from "./context"


export default function Provider({ children, session, ...props }: any) {
    return (
        <SessionProvider session={session}>
            <NextThemesProvider {...props}>
                <ContextProvider>
                    {children}
                </ContextProvider>
            </NextThemesProvider>
        </SessionProvider>
    )
}
