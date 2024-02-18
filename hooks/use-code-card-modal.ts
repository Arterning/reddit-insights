import { create } from 'zustand';

interface CodeSnippet {
    title: string;
    language: string;
    body: string;
}

interface useCodeCardStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

    code: CodeSnippet;
    setCode: (code: Record<string, any>) => void;
}

export const useCodeCardModal = create<useCodeCardStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    code: {
        title: "",
        language: "",
        body: ""
    },
    setCode: (code) => set({ code }),
}));

