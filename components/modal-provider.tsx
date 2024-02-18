"use client";

import { useEffect, useState } from "react";

import { ProModal } from "@/components/pro-modal";
import {LanguageModal} from "@/components/language-modal";
import {CodeCardModal} from "@/components/code-card-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProModal />
      <LanguageModal/>
      <CodeCardModal/>
    </>
  );
};
