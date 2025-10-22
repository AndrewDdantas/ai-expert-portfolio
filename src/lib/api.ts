// API configuration utilities
// Agora o frontend se conecta ao nosso backend local, que faz proxy seguro para a API externa
const API_CONFIG = {
  // URL do nosso backend local (não expõe credenciais!)
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001',

  // Headers padrão para todas as requisições
  getHeaders: () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Não precisamos mais enviar token do frontend!
    // O backend cuida disso de forma segura

    return headers;
  },

  // Validação se a configuração está completa
  isConfigured: () => {
    const hasBaseURL = Boolean(API_CONFIG.baseURL);

    if (!hasBaseURL) {
      console.error("Configuração da API incompleta:");
      console.log(
        "- VITE_BACKEND_URL:",
        hasBaseURL ? "✓ Definido" : "✗ Usando padrão (http://localhost:3001)"
      );
    }

    return hasBaseURL;
  },
};

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  if (!API_CONFIG.isConfigured()) {
    throw new Error(
      "API não configurada. Verifique se o backend está rodando em " + API_CONFIG.baseURL
    );
  }

  const url = `${API_CONFIG.baseURL}${endpoint}`;
  const config: RequestInit = {
    ...options,
    headers: {
      ...API_CONFIG.getHeaders(),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export default API_CONFIG;
