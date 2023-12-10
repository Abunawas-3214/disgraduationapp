import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { JobStatus } from "@prisma/client";

const prisma = new PrismaClient();

interface RequestBody {
    name: string,
    campus: string,
    date: Date,
    session: number,
    whatsapp: number,
    instagram: string,
    drive: string,
    freelance: string,
    status: JobStatus
}

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const job = await prisma.jobs.findUnique({
        where: {
            id: params.id
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
            freelanceId: true,
            freelance: {
                select: {
                    name: true
                }
            },
            status: true
        }
    })

    const data = {
        ...job,
        campus: job?.campus?.name,
        freelance: job?.freelance?.name ?? null
    }

    return NextResponse.json(data, { status: 200 });
}

export const POST = async (req: Request, { params }: { params: { id: string } }) => {
    const body = await req.json();
    const job = await prisma.jobs.findUnique({
        where: {
            id: params.id
        },
        select: {
            id: true,
            name: true,
            freelanceId: true,
            status: true
        }
    })

    if (!job?.freelanceId) {
        const res = await prisma.jobs.update({
            where: {
                id: params.id
            },
            data: {
                freelanceId: body.freelanceId
            }
        })

        return NextResponse.json({ message: "This job has been taken" }, { status: 200 });
    }
    return NextResponse.json({ message: "This job no longer available" }, { status: 409 });
}

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const job = await prisma.jobs.findUnique({
        where: {
            id: params.id
        },
        select: {
            name: true,
            campus: true,
            date: true,
            session: true,
            whatsapp: true,
            instagram: true,
            drive: true,
            freelance: {
                select: {
                    id: true
                }
            }
        }
    })

    if (job) {
        await prisma.jobs_Done.create({
            data: {
                name: job.name,
                campus: {
                    connectOrCreate: {
                        create: {
                            name: job.campus.name
                        },
                        where: {
                            name: job.campus.name
                        }
                    }
                },
                date: job.date,
                session: job.session,
                whatsapp: job.whatsapp,
                instagram: job.instagram,
                drive: job.drive,
                ...job.freelance && {
                    freelance: {
                        connect: {
                            id: job.freelance.id
                        }
                    }
                }
            }
        })

        await prisma.jobs.delete({
            where: {
                id: params.id
            }
        })
    } else {
        return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Job has been set as Completed" }, { status: 200 });
}

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const body: RequestBody = await req.json();
    const job = await prisma.jobs.update({
        where: {
            id: params.id
        },
        data: {
            name: body.name,
            ...body.campus && {
                campus: {
                    connectOrCreate: {
                        create: {
                            name: body.campus
                        },
                        where: {
                            name: body.campus
                        }
                    }
                }
            },
            date: body.date,
            session: body.session,
            ...body.whatsapp && { whatsapp: String(body.whatsapp) },
            instagram: body.instagram,
            drive: body.drive,
            ...body.freelance && {
                freelance: {
                    connect: {
                        id: body.freelance
                    }
                }
            },
            status: body.status
        },
        select: {
            id: true,
            name: true,
            campus: {
                select: {
                    name: true
                }
            },
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
        }

    })
    return NextResponse.json(job, { status: 200 });
}

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const job = await prisma.jobs.delete({
        where: {
            id: params.id
        }
    })
    return NextResponse.json(job, { status: 200 });
}