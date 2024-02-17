'use server'

import prisma from "@/lib/prismadb";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export const createCodeSnippet = async (formData) => {

    const { title, body, language } = Object.fromEntries(formData);

    await prisma.codeSnippet.create({
        data: {
            userId: '1',
            title,
            body,
            language,
        }
    })
    revalidatePath("/code");
    redirect("/code");
}


export const getCodeSnippets = async () => {
    return await prisma.codeSnippet.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const getCodeSnippet = async (id: string) => {
    return await prisma.codeSnippet.findUnique({
        where: {
            id
        }
    })
}

export const updateCodeSnippet = async (formData) => {

    const { id, title, body, language } = Object.fromEntries(formData);

    await prisma.codeSnippet.update({
        where: {
            id
        },
        data: {
            title,
            body,
            language
        }
    })
}
