import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiCall } from "@/lib/api";
import MessageRenderer from "./MessageRenderer";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Eu sou o assistente de IA do portfolio. Pode me perguntar qualquer coisa sobre as experiências, projetos e habilidades do profissional. Como posso te ajudar?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Chamando nosso backend local que faz proxy seguro para a API externa
      const data = await apiCall('/api/ai-chat', {
        method: 'POST',
        body: JSON.stringify({
          message: userMessage.text,
        }),
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.output,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Erro ao comunicar com a API:', error);
      
      // Exibir toast de erro
      toast({
        title: "Erro de Comunicação",
        description: "Não foi possível conectar com o assistente de IA. Tente novamente em alguns instantes.",
        variant: "destructive",
      });

      // Resposta simulada para demonstração em caso de erro
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Desculpe, estou com dificuldades de conexão no momento. Esta é uma resposta simulada. Por favor, tente novamente em alguns instantes.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);

      return;
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section id="ai-chat" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Converse com IA
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre experiências, projetos e habilidades através do assistente de IA
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-glow glass overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-border/50 bg-gradient-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Assistente de IA</h3>
                  <p className="text-sm text-muted-foreground">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!message.isUser && (
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-sm lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-xl transition-all duration-300 ${
                        message.isUser
                          ? "bg-gradient-primary text-primary-foreground shadow-soft"
                          : "glass border border-border/50"
                      }`}
                    >
                      {message.isUser ? (
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      ) : (
                        <MessageRenderer 
                          content={message.text} 
                          className={`text-sm ${message.isUser ? 'text-primary-foreground' : ''}`}
                        />
                      )}
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.isUser && (
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="glass border border-border/50 px-4 py-2 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">
                          Pensando...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua pergunta..."
                  className="flex-1 glass border-border/50 focus:border-primary transition-colors"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIChat;