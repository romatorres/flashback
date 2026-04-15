import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Agenda from "@/components/site/Agenda";
import Videos from "@/components/site/Videos";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import PromoModal from "@/components/site/PromoModal";

export default function Home() {
  const showPromo = process.env.NEXT_PUBLIC_SHOW_PROMO === "false";

  return (
    <div>
      <Header />
      <Hero />
      <PromoModal active={showPromo} />
      <div id="about">
        <About />
      </div>
      <div id="agenda">
        <Agenda />
      </div>
      <div id="videos">
        <Videos />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
