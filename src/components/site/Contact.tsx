import { SiWhatsapp, SiMaildotru } from "react-icons/si";
import { TfiComments } from "react-icons/tfi";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-pattern-stripes"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="flex justify-center font-gravitas-one text-4xl md:text-5xl lg:text-6xl sm:mb-24 mb-20 bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
          Entre em contato
        </h2>

        {/* Contact Info & Social */}
        <div className="space-y-8">
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
                  <span className="break-all">contatoflashback@gmail.com</span>
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
                  75 981226159
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
