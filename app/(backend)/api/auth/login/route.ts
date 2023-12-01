import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

interface RequestBody {
    name: string;
    password: string;
}

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
    const body: RequestBody = await req.json();
    const admin = await prisma.admin.findFirst({
        where: {
            name: body.name
        }
    })

    if (admin && (await bcrypt.compare(body.password, admin.password))) {
        const { password, id, ...adminWithoutPassword } = admin;
        return NextResponse.json(adminWithoutPassword, { status: 200 });
    }
    return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
}