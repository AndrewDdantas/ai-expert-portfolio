// API configuration utilities
const API_CONFIG = {
  // URL da API carregada das variáveis de ambiente
  baseURL: import.meta.env.VITE_API_URL,
  token: import.meta.env.VITE_API_TOKEN,

  // Headers padrão para todas as requisições
  getHeaders: () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (API_CONFIG.token) {
      headers["Authorization"] = API_CONFIG.token;
    }

    return headers;
  },

  // Validação se a configuração está completa
  isConfigured: () => {
    const hasToken = Boolean(API_CONFIG.token);
    const hasBaseURL = Boolean(API_CONFIG.baseURL);

    if (!hasToken || !hasBaseURL) {
      console.error("Configuração da API incompleta:");
      console.log(
        "- VITE_API_TOKEN:",
        hasToken ? "✓ Definido" : "✗ Não encontrado"
      );
      console.log(
        "- VITE_API_URL:",
        hasBaseURL ? "✓ Definido" : "✗ Não encontrado"
      );
    }

    return hasToken && hasBaseURL;
  },
};

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  if (!API_CONFIG.isConfigured()) {
    throw new Error(
      "API não configurada. Verifique as variáveis de ambiente VITE_API_TOKEN e VITE_API_URL."
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export default API_CONFIG;
