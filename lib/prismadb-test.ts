import prismadb from "@/lib/prismadb";


async function main() {
    // ... you will write your Prisma Client queries here

    const data = await prismadb.starDict.findMany();

    console.log(data);
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
