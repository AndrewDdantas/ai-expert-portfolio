# 🔒 Arquitetura de Segurança - Backend Proxy

## 📋 Visão Geral

Este projeto agora utiliza uma arquitetura de **Backend Proxy** para proteger credenciais sensíveis e aumentar a segurança da aplicação.

## 🏗️ Arquitetura

```
┌──────────────────────────────────────────────────────────┐
│                      FRONTEND                            │
│  ┌────────────────────────────────────────────────┐     │
│  │  React App (http://localhost:8080)             │     │
│  │  - Sem tokens expostos                         │     │
│  │  - Sem URLs de API expostas                    │     │
│  │  - Código público seguro                       │     │
│  └────────────────────────────────────────────────┘     │
└────────────────────┬─────────────────────────────────────┘
                     │
                     │ HTTP Request (sem credenciais)
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│                  BACKEND PROXY                           │
│  ┌────────────────────────────────────────────────┐     │
│  │  Express Server (http://localhost:3001)        │     │
│  │  - Token armazenado em .env                    │     │
│  │  - URL da API em .env                          │     │
│  │  - Adiciona autenticação                       │     │
│  └────────────────────────────────────────────────┘     │
└────────────────────┬─────────────────────────────────────┘
                     │
                     │ HTTP Request (COM token de auth)
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│                    API EXTERNA                           │
│  - Recebe requisições autenticadas                       │
│  - Processa e retorna dados                              │
└──────────────────────────────────────────────────────────┘
```

## 🔐 Segurança

### ❌ Antes (Inseguro)

```typescript
// Frontend expunha credenciais
const token = import.meta.env.VITE_API_TOKEN; // Exposto no bundle!
const apiUrl = import.meta.env.VITE_API_URL; // Exposto no bundle!

fetch(apiUrl, {
  headers: { Authorization: token }, // Token visível no browser!
});
```

### ✅ Agora (Seguro)

```typescript
// Frontend não tem acesso às credenciais
const backendUrl = "http://localhost:3001"; // Apenas URL do nosso backend

fetch(`${backendUrl}/api/ai-chat`, {
  method: "POST",
  body: JSON.stringify({ message: "Olá" }),
  // Sem token! Backend adiciona automaticamente
});
```

## 📂 Estrutura de Arquivos

```
ai-expert-portfolio/
├── src/                          # Frontend (React)
│   ├── components/
│   │   └── AIChat.tsx           # Chama /api/ai-chat
│   └── lib/
│       └── api.ts               # Configuração da API (apenas backend URL)
│
├── server/                       # Backend (Express)
│   ├── index.js                 # Servidor Express
│   ├── package.json             # Dependências do backend
│   ├── .env.example            # Template de configuração
│   ├── .env                     # Credenciais (NÃO commitado!)
│   └── README.md               # Documentação do backend
│
├── .env.example                 # Template geral
└── package.json                # Scripts para rodar tudo
```

## 🚀 Como Executar

### 1. Configurar Backend

```bash
# Entrar na pasta do servidor
cd server

# Instalar dependências
npm install

# Criar arquivo .env a partir do exemplo
cp .env.example .env

# Editar .env com suas credenciais reais
# API_URL=https://sua-api-externa.com
# API_TOKEN=seu-token-secreto-aqui
```

### 2. Executar Desenvolvimento

#### Opção A: Tudo junto (Recomendado)

```bash
# Na raiz do projeto
npm install -g concurrently  # Instalar se não tiver
npm run dev:all              # Roda frontend + backend
```

#### Opção B: Separado

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm run dev
```

### 3. Acessar

- **Frontend**: http://localhost:8080
- **Backend**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

## 🔄 Fluxo de Dados

### Chat com IA

1. Usuário digita mensagem no frontend
2. Frontend envia POST para `/api/ai-chat` (backend local)
3. Backend adiciona token de autenticação
4. Backend faz requisição para API externa
5. Backend retorna resposta para frontend
6. Frontend exibe resposta ao usuário

```javascript
// Frontend
const response = await fetch("http://localhost:3001/api/ai-chat", {
  method: "POST",
  body: JSON.stringify({ message: "Olá" }),
});

// Backend (automático)
fetch("https://api-externa.com/ai-chat", {
  headers: { Authorization: process.env.API_TOKEN },
  body: JSON.stringify({ message: "Olá" }),
});
```

## 🛡️ Benefícios de Segurança

1. **Token Nunca Exposto**: Credenciais ficam apenas no servidor
2. **URL Privada**: Endpoint real da API não é revelado
3. **Controle Centralizado**: Fácil adicionar rate limiting, logs, cache
4. **Auditoria**: Todas as requisições passam pelo backend
5. **Flexibilidade**: Fácil trocar APIs sem mudar frontend

## 📝 Variáveis de Ambiente

### Frontend (.env na raiz)

```bash
# Apenas a URL do nosso backend local
VITE_BACKEND_URL=http://localhost:3001
```

### Backend (server/.env)

```bash
# Credenciais sensíveis (NUNCA commitar!)
API_URL=https://api-externa.com
API_TOKEN=Bearer seu-token-aqui
PORT=3001
```

## 🚨 IMPORTANTE

### ⚠️ NUNCA faça commit do arquivo `.env`!

O `.gitignore` já está configurado para ignorar:

- `.env`
- `server/.env`
- Qualquer arquivo `.env.*` (exceto `.env.example`)

### ✅ Sempre use `.env.example`

Para compartilhar configuração sem expor credenciais:

- Mantenha `.env.example` com valores de exemplo
- Commite apenas `.env.example`
- Cada desenvolvedor copia e preenche suas credenciais

## 🌐 Deploy em Produção

### Backend

1. Configure variáveis de ambiente no serviço de hosting
2. Não use arquivos `.env` em produção
3. Use secrets/environment do provider (Vercel, Heroku, etc)

### Frontend

1. Atualizar `VITE_BACKEND_URL` para URL do backend em produção
2. Build: `npm run build`
3. Deploy dos arquivos estáticos

### Exemplo (Vercel)

```bash
# Backend
vercel env add API_URL
vercel env add API_TOKEN

# Frontend
vercel env add VITE_BACKEND_URL
```

## 🔍 Testando

### Testar Backend

```bash
# Health check
curl http://localhost:3001/api/health

# Chat com IA
curl -X POST http://localhost:3001/api/ai-chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Teste"}'
```

### Testar Frontend

1. Abra http://localhost:8080
2. Vá para seção "Converse com IA"
3. Envie uma mensagem
4. Verifique network tab (não deve mostrar credenciais)

## 📚 Documentação Adicional

- [README do Backend](./server/README.md) - Detalhes sobre endpoints e configuração
- [README Principal](./README.md) - Informações gerais do projeto

## 🆘 Troubleshooting

### Erro: "Cannot connect to backend"

- Verifique se o backend está rodando na porta 3001
- Execute: `cd server && npm run dev`

### Erro: "API não configurada"

- Verifique se o arquivo `server/.env` existe
- Confirme se `API_URL` e `API_TOKEN` estão definidos

### CORS Error

- Backend já tem CORS habilitado
- Se persistir, verifique se frontend está em http://localhost:8080
