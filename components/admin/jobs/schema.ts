import { z } from "zod"

export const jobSchema = z.object({
    id: z.string(),
    name: z.string(),
    campus: z.string(),
    date: z.date().or(z.string()),
    session: z.number().gte(1).lte(3),
    whatsapp: z.string().nullable(),
    instagram: z.string().nullable(),
    drive: z.string().url().nullable(),
    freelance: z.string().nullable(),
    freelanceId: z.string().nullable(),
    status: z.string()
})

export type Job = z.infer<typeof jobSchema>