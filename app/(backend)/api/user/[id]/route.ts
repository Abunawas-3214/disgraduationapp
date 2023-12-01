import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import type { User } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const user = await prisma.user.findUnique({
        where: {
            id: params.id
        },
        select: {
            id: true,
            name: true,
            email: true,
            whatsapp: true,
            instagram: true,
            price: true,
            address: true,
            description: true,
            status: true,
            bankAgency: true,
            bankNumber: true,
        }
    })
    return NextResponse.json(user, { status: 200 });
}

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const body: User = await req.json();
    let password: string = ''
    if (body.password) {
        password = await bcrypt.hash(body.password, 10)
    }
    const user = await prisma.user.update({
        where: {
            id: params.id
        },
        data: {
            name: body.name,
            email: body.email,
            ...(password && { password }),
            whatsapp: body.whatsapp,
            instagram: body.instagram,
            price: body.price,
            address: body.address,
            description: body.description,
            status: body.status,
            bankAgency: body.bankAgency,
            bankNumber: body.bankNumber,
        },
        select: {
            name: true,
            email: true,
            whatsapp: true,
            instagram: true,
            price: true,
            address: true,
            description: true,
            status: true,
            bankAgency: true,
            bankNumber: true,
        }
    })
    return NextResponse.json(user, { status: 200 });
}

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const user = await prisma.user.delete({
        where: {
            id: params.id
        }
    })
    return NextResponse.json(user, { status: 200 });
}