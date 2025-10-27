"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const titleAnimation = useScrollAnimation({ threshold: 0.2 });
  const photoAnimation = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="pt-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={titleAnimation.ref}
          className={`text-center mb-12 transition-all duration-700 ${
            titleAnimation.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-5xl md:text-7xl mb-6 bg-gradient-gold bg-clip-text text-transparent">
            Nossa História
          </h2>
        </div>

        {/* Image and Text Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Singer Photo */}
          <div
            ref={photoAnimation.ref}
            className={`relative group self-end transition-all duration-700 delay-500 ${
              photoAnimation.isVisible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <div className="absolute inset-32 top-52 left-0 bg-gradient-disco rounded-full blur-5xl opacity-30 transition duration-500 animate-pulse"></div>
            <div>
              <Image
                src="/img/vivinho.png"
                alt="foto do cantor vivinho"
                width={350}
                height={480}
              />
            </div>
          </div>

          {/* Content */}
          <div
            className={`space-y-6 transition-all duration-700 delay-700 ${
              photoAnimation.isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/90">
              Somos a ponte entre o passado e o presente, trazendo de volta a
              energia contagiante dos anos 60 e 70.
              <span className="font-display text-accent">
                {" "}
                Calças boca-de-sino
              </span>
              ,{" "}
              <span className="font-display text-accent">
                ternos reluzentes
              </span>
              ,
              <span className="font-display text-accent">
                {" "}
                plataformas altíssimas
              </span>{" "}
              – não é fantasia, é uma celebração autêntica!
            </p>
            <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/90">
              De <span className="italic">Bee Gees</span> a{" "}
              <span className="italic">Donna Summer</span>, de{" "}
              <span className="italic">ABBA</span> a
              <span className="italic"> KC and the Sunshine Band</span>, levamos
              você direto para a pista de dança onde
              <span className="font-display text-accent">
                {" "}
                o brilho nunca acaba
              </span>{" "}
              e a música nunca para.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
