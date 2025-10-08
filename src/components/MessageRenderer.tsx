import ReactMarkdown from 'react-markdown';

interface MessageRendererProps {
  content: string;
  className?: string;
}

const MessageRenderer = ({ content, className = "" }: MessageRendererProps) => {
  // Função para processar o texto e melhorar a formatação
  const processContent = (text: string) => {
    // Converte bullets simples em markdown e melhora formatação geral
    let processed = text
      // Melhora formatação de títulos/seções com **
      .replace(/\*\s*\*\*(.*?)\*\*:/g, '\n**$1:**\n')
      // Converte bullets para markdown
      .replace(/^\s*\*\s+\*\*(.*?)\*\*:/gm, '• **$1:**')
      .replace(/^\s*\*\s+/gm, '• ')
      // Melhora formatação após dois pontos
      .replace(/:\s*\n?\*\s*/g, ':\n\n• ')
      // Remove múltiplas quebras de linha
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      // Adiciona espaçamento para parágrafos
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n\n');

    return processed;
  };

  const processedContent = processContent(content);

  return (
    <div className={`prose prose-sm max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        components={{
          // Customizar renderização de diferentes elementos
          p: ({ children }) => <p className="mb-3 leading-relaxed text-sm">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          ul: ({ children }) => <ul className="list-none space-y-2 my-3 pl-0">{children}</ul>,
          li: ({ children }) => (
            <li className="flex items-start gap-2 text-sm">
              <span className="text-muted-foreground mt-1 flex-shrink-0">•</span>
              <span className="flex-1 leading-relaxed">{children}</span>
            </li>
          ),
          h1: ({ children }) => <h1 className="text-base font-bold mb-3 text-foreground">{children}</h1>,
          h2: ({ children }) => <h2 className="text-sm font-semibold mb-2 text-foreground">{children}</h2>,
          h3: ({ children }) => <h3 className="text-sm font-medium mb-2 text-foreground">{children}</h3>,
          code: ({ children }) => (
            <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono border">{children}</code>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-border pl-4 italic text-muted-foreground my-3">
              {children}
            </blockquote>
          ),
          // Renderização personalizada para texto em negrito inline
          em: ({ children }) => <em className="italic text-muted-foreground">{children}</em>,
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MessageRenderer;