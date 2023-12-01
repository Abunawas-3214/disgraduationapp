import { z } from "zod"

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    whatsapp: z.string().nullable(),
    instagram: z.string().nullable(),
    price: z.number().nullable(),
    address: z.string().nullable(),
    description: z.string().nullable(),
    status: z.string(),
    bankAgency: z.string().nullable(),
    bankNumber: z.string().nullable(),
})

export type User = z.infer<typeof userSchema>