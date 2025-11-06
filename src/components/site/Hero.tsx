"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoYoutube,
} from "react-icons/bi";

interface SparkleStyle {
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}

export default function Hero() {
  const [sparkles, setSparkles] = useState<SparkleStyle[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Detecta preferência de movimento reduzido
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const generateSparkles = () => {
      const newSparkles: SparkleStyle[] = [...Array(10)].map(() => ({
        left: `${25 + Math.random() * 50}%`,
        top: `${20 + Math.random() * 60}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${1.5 + Math.random() * 1}s`,
      }));
      setSparkles(newSparkles);
    };

    const timer = setTimeout(generateSparkles, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("/img/disco-hero.jpg")` }}
      >
        <div className="absolute z-20 inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background"></div>
      </div>

      {/* Animated sparkles - otimizado e com suporte a prefers-reduced-motion */}
      {isClient && !prefersReducedMotion && (
        <div className="absolute z-10 inset-0 overflow-hidden pointer-events-none">
          {sparkles.map((style, i) => (
            <div
              key={i}
              className="absolute opacity-0 animate-sparkle-effect will-change-[opacity,transform]"
              style={{
                ...style,
                animationFillMode: "forwards",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="white"
                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        <Image
          src="/img/logo.svg"
          alt="Banda Flashback"
          width={288}
          height={96}
          className="w-60 md:w-64 lg:w-72 h-auto mb-2 hover:scale-101 drop-shadow-[0_0_40px_rgba(0,0,0,1)] transition-transform duration-300"
          priority
        />
        <div>
          <p className="font-gravitas-one text-5xl md:text-6xl lg:text-7xl bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            Let&apos;s
          </p>
          <p className="font-gravitas-one text-6xl md:text-7xl lg:text-[80px] mb-4 bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            Dance
          </p>
          <p className="font-outfit-sans text-xl md:text-2xl mb-6 text-foreground tracking-wide max-w-3xl mx-auto">
            Reviva a magia dos anos 60, 70 e 80 com clássicos que marcaram
            gerações!
          </p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center md:mb-10 mb-0">
            <Button
              size="lg"
              variant="disco"
              onClick={() => scrollToSection("about")}
              className="text-xl px-8 py-6"
            >
              Um pouco sobre nós
            </Button>
            <Button
              variant="disco"
              className="group h-[50px] sm:w-64 w-full p-0.5"
              onClick={() => scrollToSection("contact")}
            >
              <span className="flex cursor-pointer text-xl w-full h-full rounded-md items-center justify-center bg-background group-hover:bg-background/70 transition duration-100">
                Contrate nosso show
              </span>
            </Button>
          </div>
          {/* Social icons on mobile */}
          <div className="md:hidden flex items-center justify-center gap-6 my-8">
            <a
              href="https://www.facebook.com/bandaflashbackfsa/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center border-2 border-foreground/80 text-disco-orange/90 rounded-full p-1.5 transition-transform hover:translate-y-[-2px]"
              aria-label="Facebook da Banda Flashback"
            >
              <BiLogoFacebookCircle size={30} />
            </a>

            <a
              href="https://www.instagram.com/toflashbackoficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center border-2 border-foreground/80 text-disco-orange/90 rounded-full p-1.5 transition-transform hover:translate-y-[-2px]"
              aria-label="Instagram da Banda Flashback"
            >
              <BiLogoInstagramAlt size={30} />
            </a>

            <a
              href="https://www.youtube.com/@BandaFlashback"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center border-2 border-foreground/80 text-disco-orange/90 rounded-full p-1.5 transition-transform hover:translate-y-[-2px]"
              aria-label="YouTube da Banda Flashback"
            >
              <BiLogoYoutube size={28} />
            </a>
          </div>
        </div>
        {/* Luz logo */}
        <div className="absolute sm:bottom-[420px] bottom-[470px] left-1/2 -translate-x-1/2 sm:h-52 sm:w-52 h-48 w-48 bg-gradient-disco rounded-full blur-3xl opacity-5 transition duration-700 animate-pulse -z-10 delay-700"></div>
      </div>
    </section>
  );
}
