"use client";

import {useLangModal} from "@/hooks/use-lang-modal";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import {useState} from "react";
import {Zap} from "lucide-react";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {toast} from "react-hot-toast";
import {Input} from "@/components/ui/input";


export const LanguageModal = () => {

    const langModal = useLangModal();
    const [loading, setLoading] = useState(false);

    const [word, setWord] = useState("");
    const [translation, setTranslation] = useState("");

    const onSubscribe = async () => {
        try {
            setLoading(true);
            await axios.post("/api/dict", {
                word,
                translation
            });
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
            langModal.onClose();

            //refresh page
            window.location.reload();
        }
    }

    return (
        <Dialog open={langModal.isOpen} onOpenChange={langModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold text-xl">
                            Create new word
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        <Input name="word" value={word} onChange={(e => setWord(e.target.value))}/>
                        <Input name="translation" value={translation} onChange={(e => setTranslation(e.target.value))}/>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={loading} onClick={onSubscribe} size="lg" variant="premium" className="w-full">
                        Save
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
