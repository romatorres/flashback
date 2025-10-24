import { Music, Zap, Heart } from "lucide-react";
import Image from "next/image";

const About = () => {
  const features = [
    {
      icon: Music,
      title: "Repertório",
      description:
        "Cada música é escolhida para fazer você reviver os melhores momentos da era de ouro da música.",
    },
    {
      icon: Zap,
      title: "Energia Alta",
      description:
        "Transformamos cada apresentação em uma festa vibrante, cheia de ritmo, alegria e muita dança.",
    },
    {
      icon: Heart,
      title: "Paixão Pura",
      description:
        "Tocamos com o coração, transmitindo emoção e amor por cada nota.",
    },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-pattern-stripes"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="flex justify-center font-gravitas-one text-4xl md:text-5xl lg:text-6xl sm:mb-24 mb-20 bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
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

          <div className="space-y-6 sm:mt-0 mt-10">
            <h3 className="font-gravitas-one sm:text-3xl text-2xl text-disco-orange">
              Nossa História
            </h3>
            <p className="text-lg md:text-lg leading-relaxed text-foreground/90">
              Fundada em 2005, a banda Flashback nasceu com a missão de reviver
              os grandes momentos das décadas de 60 e 70, levando ao público
              toda a energia e o encanto que marcaram uma geração. Com um
              repertório cuidadosamente selecionado, o grupo interpreta
              clássicos da dance music, disco, rock e baladas que embalaram
              pistas e corações ao redor do mundo.
            </p>
            <p className="text-lg md:text-lg leading-relaxed text-foreground/90">
              Mais do que um show, o Flashback oferece uma verdadeira viagem no
              tempo, um espetáculo vibrante, cheio de nostalgia, ritmo e emoção.
              Cada apresentação é uma celebração da música que transformou a
              história, convidando o público a cantar, dançar e se conectar com
              a magia dos velhos tempos.
            </p>
            <p className="text-lg md:text-lg leading-relaxed text-foreground/90">
              Ao longo de sua trajetória, a banda consolidou seu nome com
              performances marcantes e uma presença de palco contagiante, sempre
              fiel à proposta de manter viva a essência das eras douradas da
              música.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 sm:mt-28 mt-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-start p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105"
            >
              <feature.icon className="w-12 h-12 mb-4 text-disco-orange group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-2xl mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                {feature.description}
              </p>
              <button className="cursor-pointer bg-gradient-disco hover:shadow-glow-orange text-white font-semibold px-10 py-3 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg">
                Contrate
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
