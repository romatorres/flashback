"use client";

import {
  FacebookIcon as Facebook,
  Instagram,
  Youtube,
  Menu,
} from "lucide-react";
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
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
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
                      <Facebook className="w-5 h-5 mr-3" />
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
                      <Instagram className="w-5 h-5 mr-3" />
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
                      <Youtube className="w-5 h-5 mr-3" />
                      <span>Youtube</span>
                    </a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex-1 hidden md:block"></div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors text-xl cursor-pointer"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("shows")}
              className="text-foreground hover:text-primary transition-colors text-xl cursor-pointer"
            >
              Shows
            </button>
            <button
              onClick={() => scrollToSection("videos")}
              className="text-foreground hover:text-primary transition-colors text-xl cursor-pointer"
            >
              Vídeos
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors text-xl cursor-pointer"
            >
              Contatos
            </button>
          </nav>

          <div className="flex-1 hidden md:block"></div>
        </div>
      </header>

      {/* Fixed social icons on desktop - vertical on right side */}
      <div className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-50 flex-col gap-6">
        <Button
          variant="ghost"
          size="icon"
          className=" hover:text-primary transition-colors border border-primary rounded-full [&_svg]:size-7"
          asChild
        >
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BiLogoFacebookCircle />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-primary transition-colors border border-primary rounded-full [&_svg]:size-7"
          asChild
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BiLogoInstagram />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-primary transition-colors border border-primary rounded-full [&_svg]:size-6"
          asChild
        >
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BiLogoYoutube />
          </a>
        </Button>
      </div>
    </>
  );
}
