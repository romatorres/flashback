import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Agenda from "@/components/site/Agenda";
import Videos from "@/components/site/Videos";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import PromoModal from "@/components/site/PromoModal";
import { getSettings } from "@/actions/settings";

export default async function Home() {
  const settings = await getSettings();

  return (
    <div>
      <Header />
      <Hero />
      <PromoModal active={settings?.showPromoModal ?? false} />
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
