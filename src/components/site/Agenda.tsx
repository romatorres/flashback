import { Calendar, MapPin, Clock } from "lucide-react";

export default function Agenda() {
  const shows = [
    {
      date: "15 de Março, 2025",
      venue: "The Disco Palace",
      city: "São Paulo, SP",
      time: "21:00",
      ticketLink: "#",
    },
    {
      date: "22 de Março, 2025",
      venue: "Funky Town Hall",
      city: "Rio de Janeiro, RJ",
      time: "20:30",
      ticketLink: "#",
    },
    {
      date: "5 de Abril, 2025",
      venue: "Soul Train Station",
      city: "Belo Horizonte, MG",
      time: "22:00",
      ticketLink: "#",
    },
    {
      date: "12 de Abril, 2025",
      venue: "Boogie Nights Club",
      city: "Curitiba, PR",
      time: "21:00",
      ticketLink: "#",
    },
  ];

  return (
    <section id="shows" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="flex justify-center font-gravitas-one text-4xl md:text-5xl lg:text-6xl sm:mb-24 mb-20 bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
          Nossa agenda
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {shows.map((show, index) => (
            <div
              key={index}
              className="bg-card border-2 border-border rounded-2xl p-6 hover:border-accent transition-all duration-300 group relative overflow-hidden"
            >
              {/* Ticket stub notch */}
              <div className="absolute top-0 right-8 w-8 h-8 bg-background rounded-full transform -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-8 w-8 h-8 bg-background rounded-full transform translate-y-1/2"></div>

              {/* Dashed line */}
              <div className="absolute right-12 top-0 bottom-0 border-l-2 border-dashed border-border/50"></div>

              <div className="pr-16">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-accent" />
                  <p className="font-display text-2xl text-foreground">
                    {show.date}
                  </p>
                </div>

                <h3 className="font-display text-3xl mb-2 text-accent group-hover:text-primary transition-colors">
                  {show.venue}
                </h3>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <p className="font-body">{show.city}</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <p className="font-body">{show.time}</p>
                  </div>
                </div>

                <button className="cursor-pointer bg-gradient-disco animate-shimmer bg-[length:200%_auto] text-foreground font-semibold px-10 py-3 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <a
                    href="https://wa.me/75981226159?text=Olá!%20Vim%20pelo%20site,%20quero%20mais%20informações%20sobre%20a%20festa"
                    target="_blank"
                  >
                    Mais Detalhes
                  </a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
