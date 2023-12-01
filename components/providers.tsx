'use client'
import * as React from "react"
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from "next-themes"

export default function Provider({ children, session, ...props }: any) {
    return (
        <SessionProvider session={session}>
            <NextThemesProvider {...props}>
                {children}
            </NextThemesProvider>
        </SessionProvider>
    )
}
