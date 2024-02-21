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


export const getCodeSnippets = async (q: string, page: number, pageSize: number, language: string) => {
    const data = await prisma.codeSnippet.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: q
                    },
                    body: {
                        contains: q
                    }
                }
            ],
            language: language
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: pageSize || 10,
        skip: (page - 1) * 10 || 0,
    })

    const count = await prisma.codeSnippet.count({
        where: {
            OR: [
                {
                    title: {
                        contains: q
                    },
                    body: {
                        contains: q
                    }
                }
            ]
        }
    });

    const lang = await prisma.codeSnippet.groupBy({
        by: ['language'],
        _count: {
            language: true
        }
    })

    return {data, count, lang}
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
