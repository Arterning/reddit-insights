"use server"

import axios from "axios";
import prisma from "@/lib/prismadb";

export const saveRequest = async (url: string, method: string, body: any) => {
    
    await prisma.apiRequest.create({
        data: {
            url,
            method,
            body: JSON.stringify(body)
        }
    })

    return "Request saved"
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