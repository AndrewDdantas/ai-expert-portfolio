import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Plataforma completa de e-commerce com painel administrativo, sistema de pagamentos e gerenciamento de estoque.",
      image: "/placeholder.svg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "TypeScript"],
      liveUrl: "https://exemplo.com",
      githubUrl: "https://github.com/exemplo",
      featured: true,
    },
    {
      title: "Dashboard Analytics",
      description: "Dashboard interativo para análise de dados com gráficos dinâmicos e relatórios customizáveis.",
      image: "/placeholder.svg",
      technologies: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
      liveUrl: "https://exemplo.com",
      githubUrl: "https://github.com/exemplo",
    },
    {
      title: "Mobile Banking App",
      description: "Aplicativo bancário mobile com autenticação biométrica e transações em tempo real.",
      image: "/placeholder.svg",
      technologies: ["React Native", "Firebase", "Redux", "Jest"],
      liveUrl: "https://exemplo.com",
      githubUrl: "https://github.com/exemplo",
    },
    {
      title: "Social Media API",
      description: "API RESTful para rede social com sistema de posts, comentários e notificações em tempo real.",
      image: "/placeholder.svg",
      technologies: ["Node.js", "GraphQL", "Redis", "WebSockets"],
      githubUrl: "https://github.com/exemplo",
    },
    {
      title: "Task Management Tool",
      description: "Ferramenta de gerenciamento de tarefas com colaboração em equipe e integrations.",
      image: "/placeholder.svg",
      technologies: ["Next.js", "Prisma", "tRPC", "Tailwind CSS"],
      liveUrl: "https://exemplo.com",
      githubUrl: "https://github.com/exemplo",
    },
    {
      title: "AI Chat Assistant",
      description: "Assistente de chat inteligente com processamento de linguagem natural e aprendizado de máquina.",
      image: "/placeholder.svg",
      technologies: ["Python", "OpenAI", "FastAPI", "Docker"],
      liveUrl: "https://exemplo.com",
      githubUrl: "https://github.com/exemplo",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Meus <span className="bg-gradient-primary bg-clip-text text-transparent">Projetos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes e significativos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Interessado em ver mais? Visite meu{" "}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              GitHub
            </a>{" "}
            para explorar todos os meus repositórios.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;