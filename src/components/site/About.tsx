import { Music, Zap, Heart } from "lucide-react";
import Image from "next/image";

const About = () => {
  const features = [
    {
      icon: Music,
      title: "Som Autêntico",
      description: "Instrumentos reais, groove real, soul real da era de ouro",
    },
    {
      icon: Zap,
      title: "Alta Energia",
      description: "Dança sem parar e performances eletrizantes em cada show",
    },
    {
      icon: Heart,
      title: "Paixão Pura",
      description: "Vivemos e respiramos o funk, disco e soul dos anos 70",
    },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-pattern-stripes"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="flex justify-center font-gravitas-one text-4xl md:text-5xl lg:text-6xl mb-20 bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
          Sobre a Flashback
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="grid grid-cols-2 gap-8 items-center">
            <div className="transform -translate-y-8">
              <Image
                src="/img/vivinho01.jpg"
                alt="Foto da banda 1"
                width={300}
                height={400}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="transform translate-y-8">
              <Image
                src="/img/vivinho02.jpg"
                alt="Foto da banda 2"
                width={300}
                height={400}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="transform -translate-y-8">
              <Image
                src="/img/vivinho03.jpg"
                alt="Foto da banda 3"
                width={300}
                height={400}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="transform translate-y-8">
              <Image
                src="/img/vivinho04.jpg"
                alt="Foto da banda 4"
                width={300}
                height={400}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/90">
              Nascida de um amor compartilhado pela era mais groovy da história
              da música, Groove Nation traz os sons vibrantes do disco, funk e
              soul para palcos por todo o país. Não somos apenas uma banda cover
              – somos uma máquina do tempo para os dias do Studio 54, calças
              boca-de-sino e sapatos plataforma.
            </p>
            <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/90">
              Nossa missão é simples: colocar você na pista de dança e mantê-lo
              lá a noite toda. De Earth, Wind & Fire a Donna Summer, de
              Parliament-Funkadelic a The Bee Gees, entregamos performances
              autênticas e de alta energia que vão fazer você dançar como se
              fosse 1975.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-8 hover:border-accent transition-all duration-300 group"
            >
              <feature.icon className="w-12 h-12 mb-4 text-accent group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-2xl mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
