import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const email = "andrewdantas634@gmail.com";
  const subject = encodeURIComponent("Contato via portfólio");
  const body = encodeURIComponent("Olá, gostaria de entrar em contato com você.");
  const mailto = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <footer id="contact" className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Portfolio
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Criador de soluções inovadoras com IA para transformar ideias em realidade.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Links Rápidos</h4>
            <nav className="space-y-2">
              <a
                href="#about"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Sobre
              </a>
              <a
                href="#projects"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Projetos
              </a>
              {/*              <a
                href="#ai-chat"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                IA Chat
              </a> */}

            </nav>
          </div>

          {/* Contact section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Vamos Conversar?</h4>
            <p className="text-muted-foreground">
              Interessado em colaborar ou tem alguma pergunta? 
              Entre em contato!
            </p>
            <div className="flex space-x-3">
              <a href="https://github.com/AndrewDdantas" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-smooth">
                <Github className="h-6 w-6" />
              </a>
              <span className="sr-only">GitHub</span>
              <a href="https://www.linkedin.com/in/andrew-dantas-22a79a236/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-smooth">
                <Linkedin className="h-6 w-6" />
              </a>
              <span className="sr-only">LinkedIn</span>
              <a href={mailto} className="hover:text-primary transition-colors duration-300" aria-label={`Enviar email para ${email}`}>
                <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>© {currentYear} Andrew Dantas. </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Último update: {new Date().toLocaleDateString('pt-BR')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;