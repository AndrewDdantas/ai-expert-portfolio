# 🚀 Deploy no Netlify - Guia Completo

Este guia mostra como fazer deploy do AI Expert Portfolio no Netlify com Serverless Functions.

## 📋 Pré-requisitos

- Conta no [Netlify](https://www.netlify.com/) (gratuita)
- Código no GitHub (ou GitLab/Bitbucket)
- Credenciais da API externa (API_URL e API_TOKEN)

## 🏗️ Arquitetura no Netlify

```
┌──────────────────────────────────────────────────────┐
│              NETLIFY (Tudo em um lugar!)             │
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │  Frontend (Static Site)                    │    │
│  │  https://seu-site.netlify.app              │    │
│  └────────────────────────────────────────────┘    │
│                      ↓                              │
│  ┌────────────────────────────────────────────┐    │
│  │  Serverless Functions                      │    │
│  │  /.netlify/functions/ai-chat               │    │
│  │  /.netlify/functions/access-counter        │    │
│  │  /.netlify/functions/health                │    │
│  └────────────────────────────────────────────┘    │
│                      ↓                              │
│              API Externa (Segura)                   │
└──────────────────────────────────────────────────────┘
```

## 🚀 Método 1: Deploy via Interface Web (Recomendado)

### Passo 1: Conectar Repositório

1. Acesse [app.netlify.com](https://app.netlify.com/)
2. Clique em **"Add new site"** > **"Import an existing project"**
3. Escolha **GitHub** (ou seu provider)
4. Autorize o Netlify a acessar seus repositórios
5. Selecione o repositório `ai-expert-portfolio`

### Passo 2: Configurar Build

Preencha as configurações:

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Functions directory**: `netlify/functions` (já configurado no netlify.toml)

### Passo 3: Configurar Variáveis de Ambiente

Antes de fazer deploy, configure as variáveis:

1. Vá em **Site settings** > **Environment variables**
2. Clique em **Add a variable**
3. Adicione as seguintes variáveis:

#### Variáveis Obrigatórias:

| Nome        | Valor                         | Descrição             |
| ----------- | ----------------------------- | --------------------- |
| `API_URL`   | `https://sua-api-externa.com` | URL da API externa    |
| `API_TOKEN` | `Bearer seu-token-aqui`       | Token de autenticação |

#### Variáveis Opcionais:

| Nome           | Valor | Descrição         |
| -------------- | ----- | ----------------- |
| `NODE_VERSION` | `18`  | Versão do Node.js |

⚠️ **IMPORTANTE**: Não adicione `VITE_BACKEND_URL` pois o frontend usará as Serverless Functions automaticamente!

### Passo 4: Deploy

1. Clique em **"Deploy site"**
2. Aguarde o build (2-5 minutos)
3. Site estará disponível em `https://[nome-gerado].netlify.app`

### Passo 5: Testar

Acesse:

- **Site**: `https://seu-site.netlify.app`
- **Health Check**: `https://seu-site.netlify.app/api/health`
- **AI Chat**: Teste na interface do site

---

## 🚀 Método 2: Deploy via CLI

### Instalar Netlify CLI

```bash
npm install -g netlify-cli
```

### Login

```bash
netlify login
```

### Deploy

```bash
# Build local
npm run build

# Deploy para preview
netlify deploy

# Deploy para produção
netlify deploy --prod
```

### Configurar Variáveis via CLI

```bash
netlify env:set API_URL "https://sua-api-externa.com"
netlify env:set API_TOKEN "Bearer seu-token-aqui"
```

---

## 🚀 Método 3: Deploy Automático (CI/CD)

O Netlify já configura deploy automático quando você conecta via GitHub!

### Como Funciona

1. Você faz push para `main`
2. Netlify detecta automaticamente
3. Faz build e deploy
4. Site atualizado em ~2 minutos

### Deploy Previews

- Cada Pull Request gera um deploy preview automático
- URL única para testar antes de mergear
- Perfeito para revisão de código

---

## ⚙️ Configuração de Domínio Customizado

### Adicionar Domínio Próprio

1. Vá em **Domain settings**
2. Clique em **Add custom domain**
3. Digite seu domínio (ex: `meuportfolio.com`)
4. Configure DNS conforme instruções
5. Netlify ativa HTTPS automaticamente (Let's Encrypt)

### DNS do Netlify

Aponte seu domínio para os nameservers do Netlify:

```
dns1.p0x.netlify.com
dns2.p0x.netlify.com
dns3.p0x.netlify.com
dns4.p0x.netlify.com
```

---

## 🔍 Monitoramento e Logs

### Ver Logs de Deploy

1. Vá em **Deploys**
2. Clique no deploy específico
3. Veja logs em tempo real

### Ver Logs de Functions

1. Vá em **Functions**
2. Clique na function específica
3. Veja logs de execução

### Ou via CLI:

```bash
# Logs de deploy
netlify deploy --build --log

# Logs de functions (em tempo real)
netlify functions:log ai-chat
```

---

## 🧪 Testar Localmente com Netlify Dev

Execute o projeto exatamente como no Netlify:

```bash
# Instalar dependências
npm install

# Rodar com Netlify Dev
netlify dev
```

Isso vai:

- ✅ Rodar o frontend em http://localhost:8888
- ✅ Rodar as functions em /.netlify/functions/\*
- ✅ Simular ambiente de produção
- ✅ Usar variáveis de ambiente locais

### Variáveis Locais

Crie arquivo `.env` na raiz:

```bash
API_URL=https://sua-api-externa.com
API_TOKEN=Bearer seu-token-aqui
```

---

## 📊 Estrutura de Arquivos Netlify

```
ai-expert-portfolio/
├── netlify.toml              ← Configuração Netlify
├── netlify/
│   └── functions/            ← Serverless Functions
│       ├── health.js         ← GET /api/health
│       ├── ai-chat.js        ← POST /api/ai-chat
│       └── access-counter.js ← GET /api/access-counter
├── dist/                     ← Build do frontend (gerado)
└── src/                      ← Código fonte
```

---

## 🔐 Segurança

### ✅ Boas Práticas Implementadas

- ✅ Credenciais apenas em variáveis de ambiente
- ✅ CORS configurado nas functions
- ✅ Headers de segurança no netlify.toml
- ✅ HTTPS automático
- ✅ Validação de entrada nas functions
- ✅ Logs sem expor credenciais

### Headers de Segurança

Já configurados no `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
```

---

## 🎯 Otimizações

### 1. Cache de Assets

```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 2. Compression

Netlify automaticamente comprime com Brotli/Gzip!

### 3. CDN Global

Seu site é distribuído em 100+ POPs globalmente.

---

## 🐛 Troubleshooting

### Function não funciona

```bash
# Ver logs
netlify functions:log ai-chat

# Verificar variáveis
netlify env:list

# Testar localmente
netlify dev
```

### Build falha

```bash
# Verificar logs de build
# Vá em Deploys > [último deploy] > Deploy log

# Comum: node version
# Adicione variável NODE_VERSION=18
```

### CORS Error

As functions já têm CORS configurado. Se persistir:

```javascript
// Em cada function, adicione:
headers: {
  'Access-Control-Allow-Origin': '*',
  // ... outros headers
}
```

---

## 📈 Limites do Plano Gratuito

| Recurso              | Limite Gratuito |
| -------------------- | --------------- |
| Bandwidth            | 100 GB/mês      |
| Build minutes        | 300 min/mês     |
| Function invocations | 125K/mês        |
| Function runtime     | 100 horas/mês   |
| Sites                | Ilimitado       |

Perfeito para portfolios! 🎉

---

## 🚀 Deploy Completo - Checklist

### Antes do Deploy

- [ ] Código commitado no GitHub
- [ ] `netlify.toml` configurado
- [ ] Functions criadas em `netlify/functions/`
- [ ] Build testado localmente (`npm run build`)
- [ ] Credenciais da API prontas

### Durante o Deploy

- [ ] Repositório conectado no Netlify
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Variáveis de ambiente configuradas
  - [ ] `API_URL`
  - [ ] `API_TOKEN`

### Depois do Deploy

- [ ] Site carregou corretamente
- [ ] Health check funcionando (`/api/health`)
- [ ] AI Chat funcionando
- [ ] Access Counter funcionando
- [ ] Sem erros no console
- [ ] HTTPS ativo

---

## 🎉 Pronto!

Seu portfolio está no ar no Netlify! 🚀

### URLs Importantes

- **Site**: `https://seu-site.netlify.app`
- **Health**: `https://seu-site.netlify.app/api/health`
- **Dashboard**: `https://app.netlify.com`

### Próximos Passos

1. ✅ Configurar domínio customizado (opcional)
2. ✅ Configurar deploy previews para PRs
3. ✅ Adicionar analytics (Netlify Analytics)
4. ✅ Monitorar usage no dashboard

---

## 📚 Recursos Úteis

- [Netlify Docs](https://docs.netlify.com/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)
- [Deploy Previews](https://docs.netlify.com/site-deploys/deploy-previews/)

---

## 🆘 Precisa de Ajuda?

1. Verifique logs no dashboard Netlify
2. Use `netlify dev` para testar localmente
3. Veja [Netlify Community](https://answers.netlify.com/)
4. Abra issue no GitHub do projeto
