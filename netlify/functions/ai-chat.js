// Netlify Serverless Function - AI Chat
export async function handler(event, context) {
  // Headers CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Apenas POST permitido
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método não permitido' }),
    };
  }

  try {
    // Validar configuração
    if (!process.env.API_URL || !process.env.API_TOKEN) {
      console.error('Configuração incompleta:', {
        hasURL: Boolean(process.env.API_URL),
        hasToken: Boolean(process.env.API_TOKEN),
      });

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Configuração da API incompleta. Verifique as variáveis de ambiente.',
        }),
      };
    }

    // Parse do body
    const { message } = JSON.parse(event.body || '{}');

    // Validar mensagem
    if (!message || typeof message !== 'string' || !message.trim()) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Mensagem inválida ou vazia.',
        }),
      };
    }

    console.log('📨 Processando mensagem:', message.substring(0, 50) + '...');

    // Chamar API externa
    const response = await fetch(`${process.env.API_URL}/ai-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.API_TOKEN,
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro da API externa:', response.status, errorText);
      throw new Error(`API respondeu com status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Resposta recebida com sucesso');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };

  } catch (error) {
    console.error('❌ Erro ao chamar API externa:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Erro ao processar sua solicitação.',
        details: error.message,
      }),
    };
  }
}
