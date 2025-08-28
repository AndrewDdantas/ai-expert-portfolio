import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl,
  featured = false,
}: ProjectCardProps) => {
  return (
    <Card
      className={`group overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 transform hover:-translate-y-2 glass ${
        featured ? "ring-2 ring-primary/50" : ""
      }`}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        
        {featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              Destaque
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-sm font-medium border border-border/50"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {liveUrl && (
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-2 bg-gradient-primary hover:shadow-glow transition-all duration-300"
              onClick={() => window.open(liveUrl, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
              Ver Projeto
            </Button>
          )}
          {githubUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:border-primary transition-colors"
              onClick={() => window.open(githubUrl, "_blank")}
            >
              <Github className="h-4 w-4" />
              Código
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;