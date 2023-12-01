import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import type { Admin } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const admn = await prisma.admin.findUnique({
        where: {
            id: params.id
        }
    })
    return NextResponse.json(admn, { status: 200 });
}

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const body: Admin = await req.json();
    let password: string = ''
    if (body.password) {
        password = await bcrypt.hash(body.password, 10)
    }
    const admin = await prisma.admin.update({
        where: {
            id: params.id
        },
        data: {
            name: body.name,
            ...(password && { password })
        }
    })
    return NextResponse.json(admin, { status: 200 });
}

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const admin = await prisma.admin.delete({
        where: {
            id: params.id
        }
    })
    return NextResponse.json(admin, { status: 200 });
}