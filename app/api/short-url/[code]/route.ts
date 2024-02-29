import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET(
    req: Request,  { params }: { params: { code: string } }
) {
    const { code } = params;
    const data = await prismadb.shortUrlMap.findUnique({
        where: {
            code
        }
    })

    const longUrl = data?.longUrl

    console.log("longUrl", longUrl)

    //redirect to long url
    return NextResponse.redirect(data?.longUrl)

}