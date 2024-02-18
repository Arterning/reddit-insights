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

export const CodeCardModal = () => {

    const codeCardModal = useCodeCardModal();

    return (
        <Dialog open={codeCardModal.isOpen} onOpenChange={codeCardModal.onClose}>
            <DialogContent>
                <DialogHeader className="w-auto">
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
            </DialogContent>
        </Dialog>
    )
}
