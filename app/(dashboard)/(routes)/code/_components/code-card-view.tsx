"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  };

  return (
    <div className={"flex flex-row flex-wrap max-w-[1200px] gap-3 p-2"}>
      {codes.map((code) => (
        <div key={code.id}>
          <Card className="cursor-pointer">
            <CardHeader>
              <CardDescription>{code.title || "Unnamed"}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center items-center gap-3">
              <Link href={`/code/${code.id}`} className="text-sm">Edit</Link>
              <Button variant="link" onClick={() => handleOnClick(code)}>View</Button>
              <Badge>{code.language || "Unknown"}</Badge>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};
