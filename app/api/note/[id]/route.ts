
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,  { params }: { params: { id: string } }
) {

    const { id } = params;

    const data = await prismadb.note.findUnique({
        where: {
            id
        }
    })

    return NextResponse.json(data);
}


export async function PUT(
    req: Request,  { params }: { params: { id: string } }
) {
    //get the [id]
    const { id } = params;

    //get the data
    const data = await req.json();


    await prismadb.note.update({
        where: {
            id
        },
        data: {
            ...data
        }
    })

    return NextResponse.json(req.body);
}

export async function DELETE(
    req: Request,  { params }: { params: { id: string } }
) {

    const { id } = params;

    await prismadb.note.delete({
        where: {
            id
        }
    })

    return NextResponse.json({});
}