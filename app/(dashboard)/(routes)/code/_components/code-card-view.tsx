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
import Link from "next/link";

import { CopyBlock, dracula } from "react-code-blocks";

interface CodeCardViewProps {
  codes: Record<string, any>[];
}

export const CodeCardView = ({ codes }: CodeCardViewProps) => {
  return (
    <div className={"flex flex-row gap-3 p-2"}>
      {codes.map((code) => (
        <div key={code.id}>
          <Card>
            <CardHeader>
              <CardDescription>
                <Link href={`/code/${code.id}`}>{code.title || 'Unnamed'}</Link>
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Badge>{code.language}</Badge>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};
