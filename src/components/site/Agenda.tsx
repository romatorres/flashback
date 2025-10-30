"use client";

import { useEffect } from "react";
import { Calendar, MapPin, Clock, ClipboardCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useAgendaStore } from "@/lib/store";

export default function Agenda() {
  const cardsAnimation = useScrollAnimation({ threshold: 0.2 });
  const titleAnimation = useScrollAnimation({ threshold: 0.2 });

  // Usando o store do Zustand
  const {
    publicAgendas: agendas,
    publicLoading: loading,
    publicError: error,
    fetchPublicAgendas,
  } = useAgendaStore();

  // Carregar dados automaticamente na primeira renderização
  useEffect(() => {
    fetchPublicAgendas();
  }, [fetchPublicAgendas]);

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section id="shows" className="py-20 px-4 relative">
      {
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"></div>
      }
      <div className="relative max-w-6xl mx-auto z-10">
        <div
          ref={titleAnimation.ref}
          className={`text-center mb-20 transition-all duration-700 ${
            titleAnimation.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="flex justify-center font-gravitas-one text-4xl md:text-5xl lg:text-6xl sm:mb-24 mb-20 bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            Nossa agenda
          </h2>
        </div>

        <div ref={cardsAnimation.ref}>
          {loading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
                Carregando eventos...
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-destructive">
                Erro ao carregar eventos: {error}
              </p>
            </div>
          )}

          {!loading && !error && (!agendas || agendas.length === 0) && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Nenhum evento programado
              </h3>
              <p className="text-muted-foreground">
                Fique ligado! Novos eventos serão anunciados em breve.
              </p>
            </div>
          )}

          {!loading && !error && agendas && agendas.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {agendas.map((agenda, index) => (
                <div
                  key={agenda.id}
                  className={`bg-card border-2 border-border rounded-2xl p-4
               hover:border-accent transition-all duration-300 group relative overflow-hidden  ${
                 cardsAnimation.isVisible
                   ? "opacity-100 translate-y-0"
                   : "opacity-0 translate-y-10"
               }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Ticket stub notch */}
                  <div className="absolute top-0 right-6 w-8 h-8 bg-background rounded-full transform -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-6 w-8 h-8 bg-background rounded-full transform translate-y-1/2"></div>

                  {/* Dashed line */}
                  <div className="absolute right-10 top-0 bottom-0 border-l-2 border-dashed border-border/50"></div>

                  <div className="pr-10 flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-5 h-5 text-accent" />
                      <p className="font-display text-2xl text-foreground">
                        {formatDate(agenda.data)}
                      </p>
                    </div>

                    <h3 className="font-display text-3xl mb-2 text-accent group-hover:text-primary transition-colors">
                      {agenda.titulo}
                    </h3>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <p className="font-body">{agenda.local}</p>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <p className="font-body">{agenda.horario}</p>
                      </div>
                      {agenda.detalhes && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <ClipboardCheck className="w-4 h-4" />
                          <p className="font-body">{agenda.detalhes}</p>
                        </div>
                      )}
                    </div>

                    <button className="cursor-pointer bg-gradient-disco animate-shimmer bg-[length:200%_auto] text-foreground font-semibold px-10 py-3 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg">
                      <a
                        href="https://wa.me/75981226159?text=Olá!%20Vim%20pelo%20site,%20quero%20mais%20informações%20sobre%20a%20festa"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Mais Detalhes
                      </a>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
