"use client";

import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoYoutube,
  BiMenuAltRight,
} from "react-icons/bi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useScrollToSection } from "@/hooks/useScrollToSection";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollTo } = useScrollToSection();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    scrollTo(id);
    setOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-[72px] flex items-center justify-between">
          <div className="flex-1">
            <Image
              src="/img/logo-icon.png"
              alt="Logo Icon"
              width={40}
              height={40}
              onClick={() => scrollToSection("/")}
              className={`sm:hidden transition-all duration-300 ${
                scrolled
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-10 text-xl font-semibold">
            <button
              onClick={() => scrollToSection("/")}
              className="bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto] cursor-pointer hover:text-disco-orange transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto] cursor-pointer hover:text-disco-orange transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("agenda")}
              className="bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto] cursor-pointer hover:text-disco-orange transition-colors"
            >
              Agenda
            </button>
            <button
              onClick={() => scrollToSection("videos")}
              className="bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto] cursor-pointer hover:text-disco-orange transition-colors"
            >
              Vídeos
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto] cursor-pointer hover:text-disco-orange transition-colors"
            >
              Contatos
            </button>
          </nav>

          <div className="flex-1 flex justify-end items-center">
            {/* Mobile menu */}
            {isMounted && (
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <button>
                    <BiMenuAltRight className="w-10 h-10 text-foreground" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Menu Principal</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-6 mt-8">
                    <button
                      onClick={() => scrollToSection("/")}
                      className="text-foreground hover:text-primary transition-colors font-medium text-center text-lg"
                    >
                      Home
                    </button>
                    <button
                      onClick={() => scrollToSection("about")}
                      className="text-foreground hover:text-primary transition-colors font-medium text-center text-lg"
                    >
                      Sobre
                    </button>
                    <button
                      onClick={() => scrollToSection("agenda")}
                      className="text-foreground hover:text-primary transition-colors font-medium text-center text-lg"
                    >
                      Agenda
                    </button>
                    <button
                      onClick={() => scrollToSection("videos")}
                      className="text-foreground hover:text-primary transition-colors font-medium text-center text-lg"
                    >
                      Vídeos
                    </button>
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="text-foreground hover:text-primary transition-colors font-medium text-center text-lg"
                    >
                      Contatos
                    </button>
                  </nav>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </header>

      {/* Fixed social icons on desktop - vertical on right side */}
      <div className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-50 flex-col gap-8">
        <a
          href="https://www.facebook.com/bandaflashbackfsa/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center border-2 border-foreground/80 text-disco-orange/90 rounded-full p-1.5 duration-300 hover:translate-y-[-4px]"
        >
          <BiLogoFacebookCircle size={26} />
        </a>

        <a
          href="https://www.instagram.com/toflashbackoficial/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center border-2 border-foreground/80 text-disco-orange/90 rounded-full p-1.5 duration-300 hover:translate-y-[-4px]"
        >
          <BiLogoInstagramAlt size={26} />
        </a>

        <a
          href="https://www.youtube.com/@BandaFlashback"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center border-2 border-foreground/80 text-disco-orange/90 rounded-full p-1.5 duration-300 hover:translate-y-[-4px]"
        >
          <BiLogoYoutube size={24} />
        </a>
      </div>
    </>
  );
}
