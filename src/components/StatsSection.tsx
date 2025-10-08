import AccessCounterDisplay from "./AccessCounterDisplay";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Brain, Zap } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Code,
      value: "4+",
      label: "Anos de Experiência",
      description: "Desenvolvimento e análise de dados"
    },
    {
      icon: Database,
      value: "15+",
      label: "Projetos Concluídos",
      description: "Soluções de automação e IA"
    },
    {
      icon: Brain,
      value: "5+",
      label: "Tecnologias",
      description: "Python, SQL, BI e mais"
    },
    {
      icon: Zap,
      value: "100%",
      label: "Dedicação",
      description: "Focado em resultados"
    }
  ];

  return (
    <section id="stats" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Números que Falam
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Acompanhe minha jornada e o impacto dos projetos realizados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="glass border-border/50 p-6 text-center hover:shadow-glow transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="font-semibold text-foreground">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Estatísticas de acesso do site */}
        <div className="max-w-4xl mx-auto">
          <AccessCounterDisplay 
            variant="full" 
            className="shadow-glow" 
            showDebug={true}
          />
        </div>

        {/* Tecnologias em destaque */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-6 text-foreground">Tecnologias Principais</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Python", "SQL", "Power BI", "Machine Learning", 
              "React", "TypeScript", "Node.js", "PostgreSQL",
              "Docker", "AWS", "Git", "Streamlit"
            ].map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary" 
                className="px-3 py-1 text-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;