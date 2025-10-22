// API configuration utilities
// Agora o frontend se conecta ao nosso backend, que faz proxy seguro para a API externa
// Em produção (Netlify), usa Serverless Functions
// Em desenvolvimento, usa servidor Express local
const API_CONFIG = {
  // URL do backend
  // Produção (Netlify): usa o mesmo domínio (/.netlify/functions/)
  // Desenvolvimento: usa servidor local (http://localhost:3001)
  baseURL: import.meta.env.VITE_BACKEND_URL || 
           (import.meta.env.PROD ? "" : "http://localhost:3001"),

  // Headers padrão para todas as requisições
  getHeaders: () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Não precisamos enviar token do frontend!
    // O backend/serverless cuida disso de forma segura

    return headers;
  },

  // Validação se a configuração está completa
  isConfigured: () => {
    const hasBaseURL = Boolean(API_CONFIG.baseURL !== undefined);

    if (!hasBaseURL) {
      console.error("Configuração da API incompleta:");
      console.log(
        "- VITE_BACKEND_URL:",
        hasBaseURL ? "✓ Definido" : "✗ Usando padrão"
      );
    }

    return true; // Sempre true pois temos fallback
  },
};

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  if (!API_CONFIG.isConfigured()) {
    throw new Error(
      "API não configurada. Verifique se o backend está rodando em " +
        API_CONFIG.baseURL
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
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export default API_CONFIG;
