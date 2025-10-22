# 🎯 Guia Rápido - Deploy no Netlify (5 minutos)

## Passo a Passo com Imagens

### 1️⃣ Login no Netlify

1. Acesse: https://app.netlify.com/
2. Faça login com GitHub
3. Clique em **"Add new site"**

---

### 2️⃣ Importar Projeto

```
┌─────────────────────────────────────────┐
│  Import an existing project             │
│                                         │
│  [ ] Deploy with GitHub                 │
│  [ ] Deploy with GitLab                 │
│  [ ] Deploy with Bitbucket              │
│                                         │
│  → Escolha GitHub                       │
└─────────────────────────────────────────┘
```

1. Clique em **"Deploy with GitHub"**
2. Autorize Netlify
3. Selecione repositório: `ai-expert-portfolio`

---

### 3️⃣ Configurar Build

```
┌─────────────────────────────────────────┐
│  Build settings                          │
│                                         │
│  Branch:         [main          ▼]     │
│  Build command:  [npm run build  ]     │
│  Publish dir:    [dist           ]     │
│                                         │
│  [ Deploy site ]                        │
└─────────────────────────────────────────┘
```

Preencha:

- **Branch**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

⚠️ **NÃO clique em Deploy ainda!**

---

### 4️⃣ Adicionar Variáveis de Ambiente

```
┌─────────────────────────────────────────┐
│  Environment variables                   │
│                                         │
│  [ Add a variable ]                     │
│                                         │
│  Key:     [API_URL           ]         │
│  Value:   [https://sua-api.com]        │
│                                         │
│  Key:     [API_TOKEN         ]         │
│  Value:   [Bearer token123... ]        │
│                                         │
│  [ Save ]                               │
└─────────────────────────────────────────┘
```

1. Clique em **"Show advanced"** ou vá depois em **"Site settings"**
2. Adicione:
   - `API_URL` = `https://sua-api-externa.com`
   - `API_TOKEN` = `Bearer seu-token-aqui`

---

### 5️⃣ Deploy!

```
┌─────────────────────────────────────────┐
│  [ Deploy site ]                        │
│                                         │
│  ⏳ Building...                         │
│  ✅ Build complete                      │
│  ⏳ Deploying...                        │
│  ✅ Site is live!                       │
│                                         │
│  https://random-name.netlify.app        │
└─────────────────────────────────────────┘
```

Clique em **"Deploy site"** e aguarde (2-5 min)

---

## ✅ Verificação Rápida

### Testar Endpoints

1. **Health Check**

   ```
   https://seu-site.netlify.app/api/health
   ```

   Deve retornar: `{"status":"ok",...}`

2. **AI Chat** (use Postman ou curl)

   ```bash
   curl -X POST https://seu-site.netlify.app/api/ai-chat \
     -H "Content-Type: application/json" \
     -d '{"message":"Olá"}'
   ```

3. **Interface** - Abra o site e teste o chat!

---

## 🎯 Checklist Completo

- [ ] ✅ Login no Netlify
- [ ] ✅ Repositório conectado
- [ ] ✅ Build settings configurados
  - [ ] Branch: `main`
  - [ ] Build command: `npm run build`
  - [ ] Publish directory: `dist`
- [ ] ✅ Variáveis de ambiente adicionadas
  - [ ] `API_URL`
  - [ ] `API_TOKEN`
- [ ] ✅ Deploy realizado
- [ ] ✅ Site está live
- [ ] ✅ `/api/health` respondendo
- [ ] ✅ Chat funcionando

---

## 🔧 Configurações Adicionais

### Mudar Nome do Site

```
Site settings → Site details → Change site name
```

De: `random-name-123.netlify.app`
Para: `meu-portfolio.netlify.app`

### Domínio Customizado

```
Domain settings → Add custom domain
```

Adicione seu domínio: `meusite.com`

### Deploy Automático

Já está configurado! 🎉

Sempre que você fizer push para `main`, Netlify faz deploy automático.

---

## 📊 Monitorar Deploy

### Ver Status

```
Deploys → [último deploy]

✅ Published
⏳ Building
❌ Failed
```

### Ver Logs

```
Deploys → [deploy] → Deploy log

Mostra:
- npm install
- npm run build
- Deploy to CDN
```

### Ver Logs de Functions

```
Functions → [function name] → Function log

Mostra execuções em tempo real
```

---

## 🐛 Se Algo Der Errado

### Build Falhou?

1. Verifique logs de build
2. Teste local: `npm run build`
3. Verifique `NODE_VERSION` (adicione variável `NODE_VERSION=18`)

### Functions Não Funcionam?

1. Verifique se adicionou `API_URL` e `API_TOKEN`
2. Veja logs em: Functions → [nome] → Function log
3. Teste local: `netlify dev`

### CORS Error?

Functions já têm CORS. Se persistir, limpe cache do browser.

---

## 🎉 Pronto!

Seu portfolio está no ar! 🚀

**URL**: https://seu-site.netlify.app

### Compartilhe

- ✅ Adicione no LinkedIn
- ✅ Adicione no GitHub README
- ✅ Compartilhe com recrutadores

---

## 📱 Próximos Passos

1. **Performance**: Verifique no Lighthouse (F12 → Lighthouse)
2. **SEO**: Adicione meta tags
3. **Analytics**: Ative Netlify Analytics
4. **Domínio**: Configure domínio customizado

---

## 🆘 Precisa de Ajuda?

- 📖 [NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md) - Guia completo
- 📖 [Netlify Docs](https://docs.netlify.com/)
- 💬 [Netlify Community](https://answers.netlify.com/)
