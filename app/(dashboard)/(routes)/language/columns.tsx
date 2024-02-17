import {ColumnDef} from "@tanstack/react-table";
import {StarDict} from "@/app/(dashboard)/(routes)/language/page";


export const columns: ColumnDef<StarDict>[] = [
    {
        accessorKey: "word",
        header: "Word",
    },
    {
        accessorKey: "definition",
        header: "Definition",
    },
    {
        accessorKey: "translation",
        header: "Translation",
    },
    {
        accessorKey: "frq",
        header: "frequency",
    }
]
