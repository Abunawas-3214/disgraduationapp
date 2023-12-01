import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Status } from "@prisma/client";
import * as bcrypt from "bcrypt";

interface RequestBody {
    name: string;
    email: string;
    password: string;
    whatsapp: number;
    instagram: string;
    price: number;
    address: string;
    description: string;
    status: Status;
    bankAgency: string;
    bankNumber: string;
}

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
    const body: RequestBody = await req.json();
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
            whatsapp: body.whatsapp.toString(),
            instagram: body.instagram,
            price: body.price,
            description: body.description,
            address: body.address,
            status: body.status,
            bankAgency: body.bankAgency,
            bankNumber: body.bankNumber,
        }
    })
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword, { status: 201 });
}

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams
    const params = Object.fromEntries(searchParams)
    const users = await prisma.user.findMany({
        where: {
            ...params
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
    return NextResponse.json(users, { status: 200 });
}