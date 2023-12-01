import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    name: string,
    campus: string,
    date: Date,
    session: number,
    whatsapp: number,
    instagram: string,
    drive: string,
    freelance: string
}
const prisma = new PrismaClient();

export const POST = async (req: Request) => {
    const body: RequestBody = await req.json();

    const job = await prisma.jobs.create({
        data: {
            name: body.name,
            campus: {
                connectOrCreate: {
                    create: {
                        name: body.campus
                    },
                    where: {
                        name: body.campus
                    }
                }
            },
            date: body.date,
            session: body.session,
            whatsapp: body.whatsapp.toString(),
            instagram: body.instagram,
            ...(body.freelance && {
                freelance: {
                    connect: {
                        id: body.freelance
                    }
                }
            })
        }
    })

    return NextResponse.json(job, { status: 201 });
}

export const GET = async (req: NextRequest) => {
    const header = req.headers
    const searchParams = req.nextUrl.searchParams
    const params = Object.fromEntries(searchParams)
    const jobs = await prisma.jobs.findMany({
        where: {
            ...params
        },
        select: {
            id: true,
            name: true,
            campus: true,
            date: true,
            session: true,
            whatsapp: true,
            instagram: true,
            drive: true,
            freelance: {
                select: {
                    name: true
                }
            },
            status: true
        },
    })

    const data = jobs.map((job) => {
        return {
            ...job,
            campus: job.campus.name,
            freelance: job.freelance?.name ?? null
        }
    })

    console.log(header)
    return NextResponse.json(data, { status: 200 });
}