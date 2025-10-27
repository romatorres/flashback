"use client";

import Image from "next/image";
import { useScrollToSection } from "@/hooks/useScrollToSection";

export default function Footer() {
  const getCurrentYear = new Date().getFullYear();
  const { scrollTo } = useScrollToSection();

  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto text-center flex flex-col md:flex-row justify-between items-center sm:gap-0 gap-3">
        <div>
          <button onClick={() => scrollTo("/")} className="cursor-pointer">
            <Image
              src="/img/logo-icon_gradient.png"
              alt="Logomarca"
              width={45}
              height={45}
            />
          </button>
        </div>
        <div>
          <p className="font-body text-muted-foreground sm:text-base text-sm">
            ©{getCurrentYear} Banda Flashback. Todos os direitos reservados.
          </p>
        </div>
        <div className=" sm:mt-0 mt-3">
          <a
            href="https://romatorres.dev.br"
            target="_blank"
            className="hover:-translate-x-0.5 duration-300"
          >
            <span className="flex flex-row gap-2 items-center">
              <p className="text-sm text-muted-foreground">By:</p>
              <Image
                src="/img/logo-roma.svg"
                alt="Logo Parceiro"
                width={26}
                height={26}
              />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
