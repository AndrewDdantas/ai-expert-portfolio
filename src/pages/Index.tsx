import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import AIChat from "@/components/AIChat";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Dá espaço para o header fixo (h-16 = 64px). Ajuste se mudar a altura do header */}
      <main className="pt-16 md:pt-20">

        {/* Hero já tem id="home" dentro do componente */}
        <Hero />

        {/* Âncoras com offset para navegação suave */}
        {/* Se o About já tiver id="about" internamente, remova esta <section> wrapper */}
        <section id="about" className="scroll-mt-24">
          <About />
        </section>

        {/* Se o Projects já tiver id="projects", remova o wrapper */}
        <section id="projects" className="scroll-mt-24">
          <Projects />
        </section>

        {/* Se o AIChat já tiver id="ai-chat", remova o wrapper 
        <section id="ai-chat" className="scroll-mt-24">
          <AIChat />
        </section>*/}

        {/* Âncora para “Contato” apontar para o rodapé */}
        <div id="contact" className="scroll-mt-24" aria-hidden />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
