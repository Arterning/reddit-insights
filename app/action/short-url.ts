'use server'

import prisma from "@/lib/prismadb";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import * as  base62 from "base62/lib/ascii";

export const getLongUrl = async (code: string) => {
    
    const data = await prisma.shortUrlMap.findUnique({
        where: {
            code
        }
    })

    return data.longUrl
}


export const createShortUrl = async (formData) => {

    const { url } = Object.fromEntries(formData);

    let uniqueCode = await prisma.uniqueCode.findFirst({
        where: {
            status: 0
        }
    })

    if(!uniqueCode) {
        uniqueCode = await generateCode();
    }

    await prisma.shortUrlMap.create({
        data: {
            longUrl: url,
            code: uniqueCode.code
        }
    })

    await prisma.uniqueCode.update({
        where: {
            id: uniqueCode.id
        },
        data: {
            status: 1
        }
    })
    revalidatePath("/shortlink");
    redirect("/shortlink");

}


export const generateCode = async () => {
    
    let str = generateRandomStr(6);

    const data = await prisma.uniqueCode.findUnique({
        where: {
            code: str
        }
    });

    // check if code exists
    if(!data) {
        const data = await prisma.uniqueCode.create({
            data: {
                code: str,
                status: 0
            }
        })

        return data;
    } else {
        // regenerate
        return await generateCode()
    }
}


export function generateRandomStr(len: number) {
    let str = '';
    for(let i = 0; i < len; i++) {
        const num = Math.floor(Math.random() * 62);
        str += base62.encode(num);
    }
    return str;
}
