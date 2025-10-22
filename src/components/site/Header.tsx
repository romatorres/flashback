"use client";

import { Menu } from "lucide-react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoYoutube,
} from "react-icons/bi";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu Principal</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 mt-8">
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-foreground hover:text-primary transition-colors font-medium text-left text-lg"
                >
                  Sobre
                </button>
                <button
                  onClick={() => scrollToSection("shows")}
                  className="text-foreground hover:text-primary transition-colors font-medium text-left text-lg"
                >
                  Shows
                </button>
                <button
                  onClick={() => scrollToSection("videos")}
                  className="text-foreground hover:text-primary transition-colors font-medium text-left text-lg"
                >
                  Vídeos
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-foreground hover:text-primary transition-colors font-medium text-left text-lg"
                >
                  Contatos
                </button>

                {/* Social icons in mobile menu */}
                <div className="flex flex-col gap-3 mt-8 pt-8 border-t border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-primary transition-colors w-full justify-start"
                    asChild
                  >
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BiLogoFacebookCircle />
                      <span>Facebook</span>
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-primary transition-colors w-full justify-start"
                    asChild
                  >
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BiLogoInstagram />
                      <span>Instagram</span>
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-primary transition-colors w-full justify-start"
                    asChild
                  >
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BiLogoYoutube />
                      <span>Youtube</span>
                    </a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex-1 hidden md:block"></div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-10 text-xl font-semibold">
            <button
              onClick={() => scrollToSection("about")}
              className="bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto] cursor-pointer hover:text-disco-orange transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("shows")}
              className="bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto] cursor-pointer hover:text-disco-orange transition-colors"
            >
              Shows
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

          <div className="flex-1 hidden md:block"></div>
        </div>
      </header>

      {/* Fixed social icons on desktop - vertical on right side */}
      <div className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-50 flex-col gap-6">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center border-2 border-foreground text-disco-orange rounded-full p-1.5 transition-colors hover:translate-y-[-2px]"
        >
          <BiLogoFacebookCircle size={30} />
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center border-2 border-foreground text-disco-orange rounded-full p-1.5 transition-colors hover:translate-y-[-2px]"
        >
          <BiLogoInstagram size={30} />
        </a>

        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center border-2 border-foreground text-disco-orange rounded-full p-1.5 transition-colors hover:translate-y-[-2px]"
        >
          <BiLogoYoutube size={28} />
        </a>
      </div>
    </>
  );
}
