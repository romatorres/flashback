"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const PROMO_MODAL_SEEN_KEY = "promo_modal_seen";

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Exibir o modal apenas uma vez por sessão.
    if (
      typeof window !== "undefined" &&
      !sessionStorage.getItem(PROMO_MODAL_SEEN_KEY)
    ) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000); // Pequeno atraso para permitir o carregamento da página.

      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      sessionStorage.setItem(PROMO_MODAL_SEEN_KEY, "true");
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          aria-label="Open promotional image"
          className="sr-only"
        ></button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl p-0 border-none bg-transparent shadow-none">
        <div className="relative w-full h-auto rounded-lg overflow-hidden">
          <Image
            src="/img/flash-25anos.jpeg"
            alt="Flashback 25 anos"
            width={1080}
            height={1350}
            layout="responsive"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
