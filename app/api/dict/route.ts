import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request
) {

  // const { userId } = auth();
  // if (!userId) {
  //   return new NextResponse("Unauthorized", { status: 401 });
  // }

  const data = await prismadb.starDict.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return NextResponse.json(data);
};

export async function POST(
  req: Request
) {
  // const { userId } = auth();
  // if (!userId) {
  //   return new NextResponse("Unauthorized", { status: 401 });
  // }

  const data = await req.json();

  await prismadb.starDict.create({
    data: {
      ...data
    }
  });

  return NextResponse.json(data);

}
