# Netlify Serverless Functions

Este diretório contém as Netlify Serverless Functions que substituem o backend Express em produção.

## 📁 Estrutura

```
netlify/functions/
├── health.js           - Health check endpoint
├── ai-chat.js         - Chat com IA
└── access-counter.js  - Contador de acessos
```

## 🔗 Endpoints

Quando deployado no Netlify, as functions ficam disponíveis em:

- `GET /.netlify/functions/health` → `/api/health` (via redirect)
- `POST /.netlify/functions/ai-chat` → `/api/ai-chat` (via redirect)
- `GET /.netlify/functions/access-counter` → `/api/access-counter` (via redirect)

Os redirects estão configurados em `netlify.toml`.

## 🧪 Testar Localmente

```bash
# Com Netlify Dev (recomendado)
netlify dev

# Endpoints disponíveis em:
# http://localhost:8888/api/health
# http://localhost:8888/api/ai-chat
# http://localhost:8888/api/access-counter
```

## ⚙️ Variáveis de Ambiente

As functions usam as seguintes variáveis (configure no Netlify Dashboard):

- `API_URL` - URL da API externa
- `API_TOKEN` - Token de autenticação da API

## 📝 Como Funcionam

1. Frontend faz requisição para `/api/*`
2. Netlify redireciona para `/.netlify/functions/*`
3. Function adiciona credenciais (do environment)
4. Function chama API externa
5. Retorna resposta para o frontend

## 🔐 Segurança

- ✅ Credenciais nunca expostas no frontend
- ✅ CORS configurado
- ✅ Validação de entrada
- ✅ Headers de segurança
- ✅ Logs sem expor dados sensíveis

## 🚀 Deploy

Functions são deployadas automaticamente com o site quando você:

1. Faz push para o GitHub
2. Netlify detecta mudanças
3. Faz build e deploy
4. Functions ficam disponíveis instantaneamente

Não precisa configurar nada extra! 🎉
