import {ColumnDef} from "@tanstack/react-table";
import {StarDict} from "@/app/(dashboard)/(routes)/language/page";


export const columns: ColumnDef<StarDict>[] = [
    {
        accessorKey: "word",
        header: "Word",
    },
    {
        accessorKey: "translation",
        header: "Translation",
    },
    // {
    //     accessorKey: "definition",
    //     header: "Definition",
    // },
    // {
    //     accessorKey: "frq",
    //     header: "frequency",
    // }
]
