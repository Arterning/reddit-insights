"use server"

import axios from "axios";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const saveRequest = async (url: string, method: string, body: any) => {
    

    const data = await prisma.apiRequest.findMany({
        where: {
            url,
            method
        }
    })

    if (data.length > 0) {
        return
    }

    await prisma.apiRequest.create({
        data: {
            url,
            method,
            body: JSON.stringify(body)
        }
    })

    revalidatePath("/test-api")

}

export const deleteRequest = async (id: string) => {

    await prisma.apiRequest.delete({
        where: {
            id
        }
    })

    revalidatePath("/test-api")
}

export const getAllRequests = async () => {

    const requests = await prisma.apiRequest.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return requests
}


export const requestAPI = async (url: string, method: string, body: any) => {

    if ("GET" === method) {
        const response = await axios.get(url);
        console.log(response.data)
        return response.data;
    }

    if ("POST" === method) {
        const response = await fetch(url, {
            method,
            body: JSON.stringify(body)
        })

        return response

    }

    if ("PUT" === method) {

        const response = await axios.put(url, body);
        console.log(response.data)
        return response.data;
    }

    if ("DELETE" === method) {

        const response = await axios.delete(url);
        console.log(response.data)
        return response.data;
    }


    return {}
}