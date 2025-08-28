import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const scrollToSection = (href: string) => {
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-glow/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          {/* Profile image placeholder */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-primary shadow-glow flex items-center justify-center">
              <span className="text-4xl font-bold text-primary-foreground">P</span>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Desenvolvedor
            </span>
            <br />
            <span className="text-foreground">Full Stack</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Criando experiências digitais incríveis com código limpo e design moderno. 
            Especializado em React, Node.js e tecnologias web avançadas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
              onClick={() => scrollToSection("#projects")}
            >
              Ver Projetos
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary/50 hover:border-primary text-lg px-8 py-6 transition-all duration-300"
              onClick={() => scrollToSection("#ai-chat")}
            >
              Conversar com IA
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            <Button variant="ghost" size="lg" className="hover:text-primary transition-smooth">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button variant="ghost" size="lg" className="hover:text-primary transition-smooth">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Button>
            <Button variant="ghost" size="lg" className="hover:text-primary transition-smooth">
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("#about")}
              className="hover:text-primary transition-smooth"
            >
              <ArrowDown className="h-6 w-6" />
              <span className="sr-only">Scroll para baixo</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;