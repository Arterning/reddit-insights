import { create } from 'zustand';

export interface CodeSnippet {
    id: string;
    title: string;
    language: string;
    body: string;
}

interface useCodeCardStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

    code: CodeSnippet;
    setCode: (code: CodeSnippet) => void;
}

export const useCodeCardModal = create<useCodeCardStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    code: {
        id: "",
        title: "",
        language: "",
        body: ""
    },
    setCode: (code) => set({ code }),
}));

