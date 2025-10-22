// Netlify Serverless Function - Access Counter
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

  // Apenas GET permitido
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método não permitido' }),
    };
  }

  try {
    // Validar configuração
    if (!process.env.API_URL || !process.env.API_TOKEN) {
      console.error('Configuração incompleta');

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Configuração da API incompleta. Verifique as variáveis de ambiente.',
        }),
      };
    }

    console.log('📊 Buscando contador de acessos...');

    // Chamar API externa
    const response = await fetch(`${process.env.API_URL}/contador-acessos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.API_TOKEN,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro da API externa:', response.status, errorText);
      throw new Error(`API respondeu com status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Contador obtido com sucesso');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };

  } catch (error) {
    console.error('❌ Erro ao buscar contador de acessos:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Erro ao buscar contador de acessos.',
        details: error.message,
      }),
    };
  }
}
