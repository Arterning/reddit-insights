"use client";
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
              <CardTitle>
                <Link href={`/code/${code.id}`}>{code.title || 'Unnamed'}</Link>
              </CardTitle>
            </CardHeader>
            <CardFooter>
              <p>{code.language}</p>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};
