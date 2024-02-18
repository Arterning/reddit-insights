"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCodeCardModal } from "@/hooks/use-code-card-modal";
import Link from "next/link";

import { CopyBlock, dracula } from "react-code-blocks";
import toast from "react-hot-toast";

interface CodeCardViewProps {
  codes: Record<string, any>[];
}

export const CodeCardView = ({ codes }: CodeCardViewProps) => {
  const codeCardModal = useCodeCardModal();

  const handleOnClick = (code: Record<string, any>) => {
    codeCardModal.setCode(code);
    codeCardModal.onOpen();

    navigator.clipboard.writeText(code.body);
    toast.success("Code copied to clipboard");
  };

  return (
    <div className={"flex flex-row gap-3 p-2"}>
      {codes.map((code) => (
        <div key={code.id}>
          <Card onClick={() => handleOnClick(code)} className="cursor-pointer">
            <CardHeader>
              <CardDescription>{code.title || "Unnamed"}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-start items-center gap-3">
              <Link href={`/code/${code.id}`} className="text-sm">Edit</Link>
              <Badge>{code.language}</Badge>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};
