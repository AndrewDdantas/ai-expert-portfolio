import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Debug das variáveis de ambiente
console.log('=== DEBUG VARIÁVEIS DE AMBIENTE ===');
console.log('VITE_API_TOKEN:', import.meta.env.VITE_API_TOKEN ? '✓ Definido' : '✗ Não encontrado');
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL || 'Não encontrado');
console.log('MODE:', import.meta.env.MODE);
console.log('DEV:', import.meta.env.DEV);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
