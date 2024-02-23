import {ColumnDef} from "@tanstack/react-table";
import {StarDict} from "@/app/(dashboard)/(routes)/language/page";
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import toast from "react-hot-toast";

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
    {
        accessorKey: "frq",
        header: () => <div className="text-right">Frequency</div>,
        cell: ({row}) => {
            const value = row.getValue("frq")
            return <div className="text-right font-medium">{value}</div>
        }
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
          const dict = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(dict.word)
                    toast.success("Copied to clipboard")
                  }}
                >
                  Copy word
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Delete</DropdownMenuItem>
                <DropdownMenuItem>Update</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]
