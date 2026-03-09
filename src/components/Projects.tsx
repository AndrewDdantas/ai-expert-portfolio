import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projects = [
    {
      title: "Coradetti Irrigações",
      description: "Site institucional para empresa de irrigações, apresentando serviços, portfólio e contato.",
      image: "/coradetti.jpg",
      technologies: ["React","Node.js", "TypeScript"],
      liveUrl: "https://irrigacoescoradetti.com.br",
      featured: true,
    },
    {
      title: "Dashboard Banco de Horas",
      description: "Dashboard interativo para análise de dados com gráficos dinâmicos e relatórios customizáveis de banco de horas.",
      image: "/bancodehoras.jpg",
      technologies: ["Looker Studio", "Google Sheets"],
      liveUrl: "https://lookerstudio.google.com/u/1/reporting/b017b6df-5fb4-4abe-a665-8f8f521ccdf4/page/page_12345",
    },
    {
      title: "Gerador de Certificados com Streamlit",
      description: "Aplicativo para geração de certificados personalizados com Streamlit.",
      image: "/geradorcertificado.jpg",
      technologies: ["Streamlit", "Python", "Pandas"],
      liveUrl: "https://gerar-certificado-d-g.streamlit.app/",
    },
    {
      title: "Dashboard de Análise de Vendas",
      description: "Projeto de análise de vendas utilizando PowerBI.",
      image: "/Analise_de_Vendas.jpeg",
      technologies: ["PowerBI", "SQL", "Excel"],
      liveUrl: "https://drive.google.com/file/d/1Uu0V_kvI0EriTINjbguFSlFQYTxLKt3M/view?usp=sharing",
    },
    {
      title: "Dashboard de Análise de Itens Vendidos",
      description: "Dashboard interativo de vendas da marca Meu Compadre, com visão geral de peças vendidas, pedidos, faturamento e ticket médio. Apresenta análises por estado, produtos mais vendidos, cores, tipos e tamanhos, além da evolução do faturamento diário, facilitando a identificação de padrões e oportunidades de vendas.",
      image: "/Analise_de_Itens.jpeg",
      technologies: ["PowerBI", "SQL", "Excel"],
      liveUrl: "https://drive.google.com/file/d/1FuLh6QoaYB0edyk8UzHDAgBCxpqrr2L-/view?usp=sharing",
    },
    {
      title: "Dashboard de Vendas",
      description: "Dashboard de análise de vendas que apresenta os principais indicadores do negócio, como faturamento, comissão e lucro, com filtros por ano e mês. Inclui visualizações de desempenho mensal, distribuição geográfica das vendas, ranking de vendedores e produtos mais vendidos, permitindo identificar tendências, performance comercial e oportunidades de crescimento.",
      image: "/Analise_de_Vendas_Looker.jpeg",
      technologies: ["PowerBI", "SQL", "Excel"],
      liveUrl: "https://drive.google.com/file/d/1PJ3IIOacKo-cfqsBHy_duUShYOYCX3FE/view?usp=sharing",
    }
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
              className="animate-fade-in-up h-full"
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