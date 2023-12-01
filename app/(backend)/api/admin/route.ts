import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

interface RequestBody {
    name: string;
    password: string;
}

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
    const body: RequestBody = await req.json();
    const admin = await prisma.admin.create({
        data: {
            name: body.name,
            password: await bcrypt.hash(body.password, 10),
        }
    })
    const { password, ...adminWithoutPassword } = admin;
    return NextResponse.json(adminWithoutPassword, { status: 201 });
}

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams
    const params = Object.fromEntries(searchParams)
    const admins = await prisma.admin.findMany({
        where: {
            ...params
        },
        select: {
            id: true,
            name: true,
        }
    })
    return NextResponse.json(admins, { status: 200 });
}