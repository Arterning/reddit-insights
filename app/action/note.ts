'use server'

import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prismadb";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export const createNote = async (formData) => {

    const { userId } = auth();

    const {title, body} =
        Object.fromEntries(formData);

    await prisma.note.create({
        data: {
            userId,
            title: title ? title: 'New Note',
            type: 'note',
            body,
        }
    })

    revalidatePath("/note");
    redirect("/note");
}

export const updateNote = async (formData) => {
    const {id, body} = Object.fromEntries(formData);
    await prisma.note.update({
        where: {
            id,
        },
        data: {
            body,
        }
    })
}

export const getNotes = async (q: string, page: any) => {
    const notes = await prisma.note.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: q
                    }
                },
                {
                    body: {
                        contains: q
                    }
                }
            ]
        },
        take: 10,
        skip: (page - 1) * 10,
        orderBy: {
            createdAt: 'desc'
        }
    })

    //return notes count
    const count = await prisma.note.count({
        where: {
            OR: [
                {
                    title: {
                        contains: q
                    }
                },
                {
                    body: {
                        contains: q
                    }
                }
            ]
        },
    })

    return {notes, count}
}
