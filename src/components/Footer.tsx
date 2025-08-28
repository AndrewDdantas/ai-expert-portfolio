import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
              Desenvolvedor Full Stack apaixonado por criar experiências 
              digitais inovadoras e soluções tecnológicas impactantes.
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
              <a
                href="#ai-chat"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                IA Chat
              </a>
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
              <Button variant="ghost" size="sm" className="hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>© {currentYear} Portfolio. Feito com</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>usando React & TypeScript</span>
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