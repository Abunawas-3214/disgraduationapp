import { Status } from "@prisma/client"
import { User, Account } from "next-auth"


declare module "next-auth/jwt" {
    interface JWT {
        id: string
        level: String
        status: Status
    }
}

declare module "next-auth" {
    interface Session {
        user: User & {
            id: string
            level: String
            status: Status
        }
    }
}