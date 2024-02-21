import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return new Response("Missing id", { status: 400 });
    }

    const data = await prismadb.codeSnippet.findUnique({
        where: {
            id
        }
    })

    return NextResponse.json(data);
}

//delete code
export async function DELETE(req: Request) {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return new Response("Missing id", { status: 400 });
    }

    await prismadb.codeSnippet.delete({
        where: {
            id
        }
    })

    return NextResponse.json({
        id
    });
}

//update code
export async function PUT(req: Request) {

    const data = await req.json();

    await prismadb.codeSnippet.update({
        where: {
            id: data.id
        },
        data
    })

    return NextResponse.json(data);
}


export async function POST(req: Request) {

    const data = await req.json();

    await prismadb.codeSnippet.create({
        data: {
            ...data
        }
    })

    return NextResponse.json(data);
}
