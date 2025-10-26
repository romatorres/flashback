"use client";

import { SiWhatsapp, SiMaildotru } from "react-icons/si";
import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoYoutube,
} from "react-icons/bi";
import { TfiComments } from "react-icons/tfi";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

export default function Contact() {
  const titleAnimation = useScrollAnimation({ threshold: 0.2 });
  return (
    <section id="contact" className="pt-20 px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-pattern-stripes"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          ref={titleAnimation.ref}
          className={`text-center mb-20 transition-all duration-700 ${
            titleAnimation.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="flex justify-center font-gravitas-one text-4xl md:text-5xl lg:text-6xl bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            Entre em contato
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-end md:gap-14 gap-0">
          {/* Image Column (40%) */}
          <div className="w-full md:w-2/5">
            <div className="md:block hidden">
              <Image
                src="/img/vivinho.png"
                alt="foto do cantor vivinho"
                width={350}
                height={480}
              />
            </div>
          </div>

          {/* Contact Info Column (60%) */}
          <div className="w-full flex justify-center items-center">
            <div className="w-full pb-20">
              <div className="text-start p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 hover:border-accent/40 transition-all duration-300">
                <span className="text-5xl text-disco-orange">
                  <TfiComments />
                </span>

                <p className="sm:text-xl text-lg text-foreground my-5">
                  Entre em contato conosco para reservas e consultas!
                </p>
                <div className="flex flex-col gap-3 mt-4">
                  <div>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=contatoflashback@gmail.com&su=Contratar%20a%20banda&body=Olá,%20gostaria%20de%20um%20orçamento."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 sm:text-2xl text-xl text-foreground hover:text-disco-orange transition-colors"
                    >
                      <span className="text-disco-orange">
                        <SiMaildotru />
                      </span>
                      <span className="break-all">
                        contatoflashback@gmail.com
                      </span>
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://wa.me/75981226159?text=Olá!%20Vim%20pelo%20site,%20quero%20mais%20informações%20sobre%20a%20banda"
                      target="_blank"
                      className="flex items-center gap-3 sm:text-2xl text-xl text-foreground hover:text-disco-orange transition-colors"
                    >
                      <span className="text-disco-orange">
                        <SiWhatsapp />
                      </span>
                      75 98122-6159
                    </a>
                  </div>
                  <div className="md:hidden flex justify-center mt-6 gap-6">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center border-2 border-foreground/80 text-disco-orange/90 rounded-full p-1.5 duration-300 hover:translate-y-[-4px]"
                    >
                      <BiLogoFacebookCircle size={20} />
                    </a>

                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center border-2 border-foreground/80 text-disco-orange/90 rounded-full p-1.5 duration-300 hover:translate-y-[-4px]"
                    >
                      <BiLogoInstagramAlt size={20} />
                    </a>

                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center border-2 border-foreground/80 text-disco-orange/90 rounded-full p-1.5 duration-300 hover:translate-y-[-4px]"
                    >
                      <BiLogoYoutube size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
