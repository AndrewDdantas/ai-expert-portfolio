// Netlify Serverless Function - Health Check
export async function handler(event, context) {
  // Validação da configuração
  const validateApiConfig = () => {
    const hasURL = Boolean(process.env.API_URL);
    const hasToken = Boolean(process.env.API_TOKEN);
    return hasURL && hasToken;
  };

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    },
    body: JSON.stringify({
      status: 'ok',
      message: 'Backend está funcionando no Netlify',
      apiConfigured: validateApiConfig(),
      timestamp: new Date().toISOString(),
    }),
  };
}
