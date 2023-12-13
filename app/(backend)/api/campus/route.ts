import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
    const res = await prisma.campus.findMany({
        orderBy: {
            name: 'asc'
        }
    });
    const campuses = res.map(campus => campus.name)
    return Response.json(campuses, { status: 200 });
}