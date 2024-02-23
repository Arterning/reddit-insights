"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";


import {useCodeCardModal} from "@/hooks/use-code-card-modal";
import { Editor } from "@monaco-editor/react";
import {CopyBlock, dracula} from "react-code-blocks";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import toast from "react-hot-toast";

export const CodeCardModal = () => {

    const codeCardModal = useCodeCardModal();

    const handleOnClick = (body) => {
        navigator.clipboard.writeText(body);
        toast.success("Code copied to clipboard");
      };

    return (
        <Dialog open={codeCardModal.isOpen} onOpenChange={codeCardModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        {codeCardModal.code.title || "Unnamed"}
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        <Editor
                            height="300px"
                            language={codeCardModal.code.language}
                            value={codeCardModal.code.body}
                            theme="vs-dark"
                        />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                <Button size="lg" variant="premium" className="w-full" onClick={() => handleOnClick(codeCardModal.code.body)}>
                        Copy
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
