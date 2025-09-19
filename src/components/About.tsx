import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Rocket, Users, Zap } from "lucide-react";

const About = () => {
  const skills = [
    "Python", "MySQL", "MongoDB", "PostgreSQL", "AWS",
    "Docker", "Git", "Google Cloud", "LangChain", "OpenAI",
    "Flutter", "Dart"
  ];

  const highlights = [
    {
      icon: Code,
      title: "Código Limpo",
      description: "Escrevo código mantível e escalável seguindo as melhores práticas de desenvolvimento."
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Otimizo aplicações para máxima velocidade e experiência do usuário."
    },
    {
      icon: Users,
      title: "Colaboração",
      description: "Trabalho efetivamente em equipes ágeis e projetos multidisciplinares."
    },
    {
      icon: Zap,
      title: "Inovação",
      description: "Sempre atualizado com as últimas tecnologias e tendências do mercado."
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Sobre <span className="bg-gradient-primary bg-clip-text text-transparent">Mim</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Desenvolvedor apaixonado por criar soluções inovadoras
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile content */}
          <div className="space-y-6 animate-fade-in-up">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Profissional com 4 anos de experiência na área de logística, sendo 3 deles dedicados à análise de dados, automações e melhoria contínua. Estudante de Ciência de Dados, com forte domínio em SQL e Python, além de experiência com BigQuery, Spark e ferramentas de visualização como Power BI, Looker Studio, Redash e Tableau. Atua com foco em processos enxutos, sendo certificado Green Belt em Lean.

            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Possui perfil analítico, pensamento crítico e sólida vivência em ambientes logísticos e administrativos. Destaque na aplicação de metodologias como PDCA, 5 Porquês, Ishikawa e Gemba, bem como no uso de ferramentas de automação como Power Automate e Google Apps Script.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experiência em desenvolvimento de agents de IA personalizados utilizando RAG e outras tecnologias, desenvolvimento de aplicação de reconhecimento facial com Flutter e programação em Delphi.
            </p>
          </div>

          {/* Profile image placeholder */}
          <div className="relative">
            <div className="w-full max-w-md mx-auto aspect-square bg-gradient-primary rounded-2xl shadow-glow flex items-center justify-center">
              <img 
                src="/andrew.jpg" 
                alt="Foto" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }}></div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, index) => (
            <Card key={index} className="p-6 text-center glass shadow-card hover:shadow-glow transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Skills */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Tecnologias & Ferramentas
            </span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-4 py-2 text-sm font-medium glass border border-border/50 hover:border-primary/50 hover:shadow-soft transition-all duration-300 cursor-default"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;