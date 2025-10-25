"use client";

import { useTaos } from "@/hooks/useTaos";
import { SiMaildotru, SiWhatsapp } from "react-icons/si";

export default function ContactSection() {
  useTaos();

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="font-gravitas-one text-5xl mb-16 bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]
                     taos:opacity-0 taos:translate-y-[40%] duration-[800ms]"
          data-taos-offset="200"
        >
          Vamos Nos Conectar
        </h2>

        <div
          className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto
                     taos:opacity-0 taos:translate-y-[50%] duration-[700ms]"
          data-taos-offset="250"
        >
          <h3 className="font-display text-3xl mb-4 text-disco-orange">
            Contatos para Shows
          </h3>

          <div className="flex flex-col gap-4 items-center text-2xl">
            <a
              href="mailto:contatoflashback@gmail.com?subject=Contratar%20a%20banda"
              target="_blank"
              className="flex items-center gap-3 text-foreground hover:text-disco-orange transition-colors"
            >
              <span className="text-disco-orange">
                <SiMaildotru />
              </span>
              <span className="break-all">contatoflashback@gmail.com</span>
            </a>

            <a
              href="https://wa.me/75981226159"
              target="_blank"
              className="flex items-center gap-3 text-foreground hover:text-disco-orange transition-colors"
            >
              <span className="text-disco-orange">
                <SiWhatsapp />
              </span>
              75 98122-6159
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
