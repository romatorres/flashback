"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
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

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: SparkleStyle[] = [...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
      }));
      setSparkles(newSparkles);
    };
    generateSparkles();
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
        style={{ backgroundImage: `url("img/disco-hero.jpg")` }}
      >
        <div className="absolute z-20 inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background"></div>
      </div>

      {/* Animated sparkles */}
      <div className="absolute z-10 inset-0 overflow-hidden pointer-events-none">
        {sparkles.map((style, i) => (
          <div key={i} className="absolute animate-pulse" style={style}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
              className="drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              style={{
                filter:
                  "drop-shadow(0 0 12px rgba(255,255,255,0.9)) drop-shadow(0 0 80px rgba(255,255,255,0.6))",
              }}
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        <Image
          src="/img/logo.svg"
          alt="Banda Flashback"
          width={288}
          height={96}
          className="w-60 md:w-64 lg:w-72 h-auto mb-2 hover:scale-101 drop-shadow-[0_0_40px_rgba(0,0,0,1)] transition-all duration-300"
        />
        <div>
          <p className="font-gravitas-one text-5xl md:text-6xl lg:text-7xl bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            Let&apos;s
          </p>
          <p className="font-gravitas-one text-6xl md:text-7xl lg:text-[80px] mb-4 bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            Dance
          </p>
          <p className="font-outfit-sans text-lg md:text-2xl mb-6 text-foreground font-light tracking-wide max-w-3xl mx-auto">
            Reviva a magia dos anos 60 e 70 com clássicos que marcaram gerações
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              variant="disco"
              onClick={() => scrollToSection("shows")}
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
        </div>
      </div>
    </section>
  );
}
