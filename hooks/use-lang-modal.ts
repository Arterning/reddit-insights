import { create } from 'zustand';

interface useLangModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useLangModal = create<useLangModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

