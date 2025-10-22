# 🚀 AI Expert Portfolio

Portfolio profissional com integração de IA, contador de acessos e arquitetura segura com backend proxy.

## ✨ Funcionalidades

- 🤖 **Chat com IA**: Converse sobre experiências, projetos e habilidades
- 📊 **Contador de Acessos**: Estatísticas em tempo real de visitantes
- 🔒 **Arquitetura Segura**: Backend proxy protege credenciais sensíveis
- 🎨 **Design Moderno**: Interface responsiva com Tailwind CSS e shadcn/ui
- ⚡ **Performance**: Construído com React + Vite

## 🏗️ Arquitetura

Este projeto utiliza uma arquitetura de **Backend Proxy** para máxima segurança:

```
Frontend (React) → Backend (Express) → API Externa
   localhost:8080     localhost:3001      (credenciais seguras)
```

### Por que Backend Proxy?

- ✅ Token de API **nunca exposto** no código frontend
- ✅ URL da API externa mantida **privada**
- ✅ Controle centralizado de autenticação
- ✅ Fácil adicionar rate limiting, cache e logs
- ✅ Deploy seguro sem expor credenciais

📖 **Documentação completa**: [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🚀 Como Executar

### Setup Rápido (Primeira vez)

#### Windows PowerShell

```powershell
# Executar script de setup automatizado
.\setup-backend.ps1
```

#### Manual

```bash
# 1. Instalar dependências do frontend
npm install

# 2. Configurar backend
cd server
npm install
cp .env.example .env

# 3. Editar server/.env com suas credenciais
# API_URL=https://sua-api-externa.com
# API_TOKEN=seu-token-secreto-aqui
```

### Executar em Desenvolvimento

#### Opção 1: Tudo Junto (Recomendado)

```bash
npm run dev:all
```

#### Opção 2: Separado

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev
```

### Acessar

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

## 📦 Tecnologias

### Frontend

- **React 18** - Biblioteca UI
- **TypeScript** - Type safety
- **Vite** - Build tool rápido
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **React Query** - Data fetching
- **React Router** - Navegação

### Backend

- **Node.js** - Runtime
- **Express** - Framework web
- **dotenv** - Variáveis de ambiente
- **CORS** - Cross-Origin Resource Sharing

## 📂 Estrutura do Projeto

```
ai-expert-portfolio/
├── src/                    # Frontend React
│   ├── components/        # Componentes React
│   │   ├── AIChat.tsx    # Chat com IA
│   │   └── ui/           # Componentes UI (shadcn)
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilitários
│   │   └── api.ts        # Cliente API (conecta ao backend)
│   └── pages/            # Páginas
│
├── server/                # Backend Express
│   ├── index.js          # Servidor principal
│   ├── package.json      # Dependências backend
│   ├── .env.example      # Template de configuração
│   └── README.md         # Docs do backend
│
├── public/               # Assets estáticos
├── .env.example          # Template geral
├── package.json          # Dependências frontend
└── ARCHITECTURE.md       # Documentação da arquitetura
```

## 🔐 Segurança

### Variáveis de Ambiente

#### Frontend (.env na raiz)

```bash
VITE_BACKEND_URL=http://localhost:3001
```

#### Backend (server/.env)

```bash
API_URL=https://api-externa.com
API_TOKEN=seu-token-secreto
PORT=3001
```

### ⚠️ IMPORTANTE

- **NUNCA** faça commit do arquivo `.env`
- Credenciais ficam **apenas** no servidor
- Use `.env.example` para templates
- Em produção, use secrets do provider (Vercel, Heroku, etc)

## 🧪 Testando

### Testar Backend

```bash
# Health check
curl http://localhost:3001/api/health

# Chat com IA
curl -X POST http://localhost:3001/api/ai-chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Olá!"}'
```

### Testar Frontend

1. Acesse http://localhost:8080
2. Navegue até "Converse com IA"
3. Envie uma mensagem no chat
4. Verifique que funciona sem expor credenciais

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Frontend apenas (Vite)
npm run dev:backend      # Backend apenas (Express)
npm run dev:all          # Frontend + Backend juntos
npm run dev:netlify      # Simular ambiente Netlify localmente

# Build
npm run build            # Build para produção
npm run preview          # Preview do build local

# Deploy (Netlify CLI)
npm run netlify:deploy       # Deploy preview
npm run netlify:deploy:prod  # Deploy produção
```

## 🚀 Deploy

### 🌐 Netlify (Recomendado) - Tudo em um lugar!

O Netlify oferece hosting gratuito com Serverless Functions integradas.

#### Deploy Rápido (5 minutos)

1. **Conecte seu repositório GitHub ao Netlify**
2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Adicione Variáveis de Ambiente**:
   - `API_URL`: URL da sua API externa
   - `API_TOKEN`: Token de autenticação
4. **Deploy!**

✨ **Guides completos**:

- 📖 [Guia Rápido Netlify](./NETLIFY_QUICKSTART.md) - 5 minutos
- 📖 [Guia Completo Netlify](./NETLIFY_DEPLOY.md) - Detalhado

#### Vantagens do Netlify

- ✅ **Gratuito** para portfolios
- ✅ **Serverless Functions** incluídas (substitui Express)
- ✅ **Deploy automático** com GitHub
- ✅ **HTTPS** automático
- ✅ **CDN global** integrado
- ✅ **Deploy previews** para PRs

### 🔧 Outras Opções

#### Vercel

Deploy separado de frontend e backend.

- Frontend: `vercel --prod`
- Backend: Deploy do diretório `server/`

#### Heroku

- Backend: `git subtree push --prefix server heroku main`
- Frontend: Deploy normal

📖 [Guia completo de deploy](./DEPLOY_GUIDE.md)

## 🆘 Troubleshooting

### Backend não conecta

```bash
# Verificar se está rodando
curl http://localhost:3001/api/health

# Iniciar backend
cd server && npm run dev
```

### Erro "API não configurada"

- Verifique se `server/.env` existe
- Confirme que `API_URL` e `API_TOKEN` estão preenchidos

### CORS Error

- Backend já tem CORS habilitado
- Verifique se frontend está em `http://localhost:8080`

## 📚 Documentação

- 🚀 [Guia Rápido - Netlify](./NETLIFY_QUICKSTART.md) - Deploy em 5 minutos
- 📖 [Deploy Netlify Completo](./NETLIFY_DEPLOY.md) - Guia detalhado
- 🏗️ [Arquitetura Completa](./ARCHITECTURE.md) - Como funciona
- 🔧 [Backend API](./server/README.md) - Documentação do servidor
- 🌐 [Deploy Geral](./DEPLOY_GUIDE.md) - Outras plataformas
- 🧪 [Testes de API](./API_TESTS.md) - Como testar
- ⚡ [Quick Start](./QUICKSTART.md) - Começar em 5 minutos
- 🔐 [Segurança](./SECURITY.md)

## 📄 Licença

Este é um projeto pessoal de portfolio.

---

Desenvolvido com ❤️ usando React, TypeScript e Node.js
