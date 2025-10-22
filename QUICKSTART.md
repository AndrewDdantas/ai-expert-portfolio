# 🚀 Quick Start Guide

Guia rápido para começar a usar o AI Expert Portfolio em 5 minutos!

## ⚡ Setup Rápido

### 1️⃣ Clone e Instale

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/ai-expert-portfolio.git
cd ai-expert-portfolio

# Instale dependências do frontend
npm install

# Instale dependências do backend
cd server
npm install
cd ..
```

### 2️⃣ Configure as Credenciais

```bash
# Copie o template de configuração do backend
cd server
cp .env.example .env
```

Edite `server/.env` e adicione suas credenciais:

```bash
API_URL=https://sua-api-externa.com
API_TOKEN=seu-token-de-autenticacao
PORT=3001
```

### 3️⃣ Execute

```bash
# Volte para a raiz do projeto
cd ..

# Execute frontend + backend juntos
npm run dev:all
```

### 4️⃣ Acesse

Abra seu navegador em:
- **Frontend**: http://localhost:8080
- **Backend**: http://localhost:3001/api/health

## ✅ Verificação Rápida

1. ✅ Frontend carregou em http://localhost:8080?
2. ✅ Backend respondeu em http://localhost:3001/api/health?
3. ✅ Chat com IA funciona na seção "Converse com IA"?

Se tudo estiver ✅, você está pronto! 🎉

## 🐛 Problemas Comuns

### Backend não inicia
```bash
# Verifique se está na pasta correta
cd server

# Verifique se as dependências estão instaladas
npm install

# Tente rodar manualmente
npm run dev
```

### Frontend não conecta no backend
```bash
# Verifique se o backend está rodando
curl http://localhost:3001/api/health

# Verifique o arquivo .env na raiz (se existir)
# Deve ter: VITE_BACKEND_URL=http://localhost:3001
```

### Erro "API não configurada"
```bash
# Verifique se server/.env existe
ls server/.env

# Se não existir, crie:
cd server
cp .env.example .env

# Edite com suas credenciais
nano .env  # ou notepad .env no Windows
```

## 📚 Próximos Passos

- 📖 Leia [README.md](./README.md) para documentação completa
- 🏗️ Veja [ARCHITECTURE.md](./ARCHITECTURE.md) para entender a arquitetura
- 🔧 Configure personalização no código

## 🎯 Estrutura Mínima

```
ai-expert-portfolio/
├── server/
│   ├── .env          ← SUAS CREDENCIAIS AQUI
│   └── index.js      ← Backend servidor
├── src/              ← Frontend React
└── package.json      ← Scripts npm
```

## 💡 Comandos Úteis

```bash
# Rodar tudo junto
npm run dev:all

# Rodar separado
npm run dev          # Frontend apenas
npm run dev:backend  # Backend apenas

# Build para produção
npm run build

# Verificar saúde do backend
curl http://localhost:3001/api/health
```

## 🔐 Segurança

⚠️ **NUNCA** commite o arquivo `server/.env`!

O `.gitignore` já está configurado para proteger suas credenciais.

## 🆘 Precisa de Ajuda?

1. Verifique [README.md](./README.md)
2. Veja [ARCHITECTURE.md](./ARCHITECTURE.md)
3. Leia [server/README.md](./server/README.md)

---

**Tempo estimado de setup**: 5 minutos ⏱️
