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

  // 用Grid布局可以设置行列数，因为我们一页是15个元素，所以就是3行5列
  const gridViewClass = "grid grid-cols-1 grid-rows-15 gap-5 md:grid md:grid-cols-5 md:grid-rows-3 md:gap-4 max-w-screen-xl"
  const listViewClass = "flex flex-row flex-wrap max-w-[1200px] gap-3 p-2"

  return (
    <div className={gridViewClass}>
      {codes.map((code) => (
        <div key={code.id}>
          <Card className="cursor-pointer min-w-fit">
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
