import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Agenda from "@/components/site/Agenda";
import Videos from "@/components/site/Videos";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import Teste from "@/components/site/Teste";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
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
      <Teste />
      <Footer />
    </div>
  );
}
