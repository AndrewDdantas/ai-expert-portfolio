import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração da API externa (protegida no backend)
const API_CONFIG = {
  baseURL: process.env.API_URL,
  token: process.env.API_TOKEN,
};

// Validação da configuração
const validateApiConfig = () => {
  if (!API_CONFIG.baseURL || !API_CONFIG.token) {
    console.error('⚠️  Configuração da API incompleta!');
    console.log('- API_URL:', API_CONFIG.baseURL ? '✓ Definido' : '✗ Não encontrado');
    console.log('- API_TOKEN:', API_CONFIG.token ? '✓ Definido' : '✗ Não encontrado');
    return false;
  }
  return true;
};

// Endpoint de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend está funcionando',
    apiConfigured: validateApiConfig()
  });
});

// Endpoint para chat com IA
app.post('/api/ai-chat', async (req, res) => {
  try {
    if (!validateApiConfig()) {
      return res.status(500).json({ 
        error: 'Configuração da API incompleta. Verifique as variáveis de ambiente.' 
      });
    }

    const { message } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ 
        error: 'Mensagem inválida ou vazia.' 
      });
    }

    // Fazer a chamada para a API externa
    const response = await fetch(`${API_CONFIG.baseURL}/ai-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API_CONFIG.token,
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`API respondeu com status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Erro ao chamar API externa:', error);
    res.status(500).json({ 
      error: 'Erro ao processar sua solicitação.',
      details: error.message 
    });
  }
});

// Endpoint para contador de acessos
app.get('/api/access-counter', async (req, res) => {
  try {
    if (!validateApiConfig()) {
      return res.status(500).json({ 
        error: 'Configuração da API incompleta. Verifique as variáveis de ambiente.' 
      });
    }

    const response = await fetch(`${API_CONFIG.baseURL}/contador-acessos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API_CONFIG.token,
      },
    });

    if (!response.ok) {
      throw new Error(`API respondeu com status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Erro ao buscar contador de acessos:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar contador de acessos.',
      details: error.message 
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 AI Chat endpoint: http://localhost:${PORT}/api/ai-chat`);
  console.log(`📊 Access Counter: http://localhost:${PORT}/api/access-counter`);
  
  if (validateApiConfig()) {
    console.log('✅ Configuração da API validada com sucesso!');
  }
});
