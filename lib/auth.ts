import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const res = await fetch("http://localhost:3000/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: credentials?.name,
                        password: credentials?.password
                    })
                })
                const user = await res.json()
                if (user && res.ok) {
                    // Any object returned will be saved in `user` property of the JWT
                    console.log(user)
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
        newUser: "/onboarding"
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id
                session.user.level = token.level
                session.user.status = token.status
            }
            return session
        },
        async jwt({ token, user, account, trigger, session }) {
            if (account) {
                if (!user.email) {
                    token.level = "ADMIN"
                } else {
                    token.level = "USER"
                    const dbUser = await prisma.user.findUnique({
                        where: {
                            id: user.id
                        }
                    })
                    if (user && dbUser) {
                        token.id = dbUser.id
                        token.status = dbUser.status
                    }
                }
            }
            if (trigger === "update") {
                token.status = session.status
            }
            return token
        }
    }
}