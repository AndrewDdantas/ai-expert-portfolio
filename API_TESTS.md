# Testes de API - Backend

Este arquivo contém exemplos de como testar os endpoints da API.

## 🧪 Usando cURL (Terminal)

### Health Check
```bash
curl http://localhost:3001/api/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "message": "Backend está funcionando",
  "apiConfigured": true
}
```

---

### AI Chat
```bash
curl -X POST http://localhost:3001/api/ai-chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Olá, como você pode me ajudar?"}'
```

**Resposta esperada:**
```json
{
  "output": "Olá! Eu sou o assistente de IA do portfolio..."
}
```

---

### Access Counter
```bash
curl http://localhost:3001/api/access-counter
```

**Resposta esperada:**
```json
{
  "totalVisits": 123,
  "uniqueVisits": 45,
  "todayVisits": 12,
  "lastVisit": "2025-10-22T10:30:00.000Z"
}
```

---

## 🧪 Usando PowerShell (Windows)

### Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/health" -Method Get
```

### AI Chat
```powershell
$body = @{
    message = "Olá, como você pode me ajudar?"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/ai-chat" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"
```

### Access Counter
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/access-counter" -Method Get
```

---

## 🧪 Usando JavaScript/Fetch

### Health Check
```javascript
fetch('http://localhost:3001/api/health')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
```

### AI Chat
```javascript
fetch('http://localhost:3001/api/ai-chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Olá, como você pode me ajudar?'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
```

### Access Counter
```javascript
fetch('http://localhost:3001/api/access-counter')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
```

---

## 🧪 Usando Postman

### 1. Health Check
- **Method**: GET
- **URL**: `http://localhost:3001/api/health`

### 2. AI Chat
- **Method**: POST
- **URL**: `http://localhost:3001/api/ai-chat`
- **Headers**: 
  - Content-Type: `application/json`
- **Body** (raw JSON):
```json
{
  "message": "Olá, como você pode me ajudar?"
}
```

### 3. Access Counter
- **Method**: GET
- **URL**: `http://localhost:3001/api/access-counter`

---

## 🔍 Testando Erros

### Mensagem vazia
```bash
curl -X POST http://localhost:3001/api/ai-chat \
  -H "Content-Type: application/json" \
  -d '{"message":""}'
```

**Resposta esperada:**
```json
{
  "error": "Mensagem inválida ou vazia."
}
```

### Sem configuração (API_TOKEN não definido)
Se você remover `API_TOKEN` do `.env`:

```json
{
  "error": "Configuração da API incompleta. Verifique as variáveis de ambiente."
}
```

---

## 📊 Testes Automatizados

### Criar arquivo de teste
```javascript
// test-api.js
const BASE_URL = 'http://localhost:3001';

async function testHealthCheck() {
  console.log('🧪 Testando Health Check...');
  const response = await fetch(`${BASE_URL}/api/health`);
  const data = await response.json();
  console.log('✅', data);
}

async function testAIChat() {
  console.log('🧪 Testando AI Chat...');
  const response = await fetch(`${BASE_URL}/api/ai-chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Teste automatizado' })
  });
  const data = await response.json();
  console.log('✅', data);
}

async function testAccessCounter() {
  console.log('🧪 Testando Access Counter...');
  const response = await fetch(`${BASE_URL}/api/access-counter`);
  const data = await response.json();
  console.log('✅', data);
}

async function runTests() {
  try {
    await testHealthCheck();
    await testAIChat();
    await testAccessCounter();
    console.log('✨ Todos os testes passaram!');
  } catch (error) {
    console.error('❌ Erro nos testes:', error);
  }
}

runTests();
```

### Executar testes
```bash
node test-api.js
```

---

## 🎯 Status Codes Esperados

| Endpoint | Method | Success | Error |
|----------|--------|---------|-------|
| `/api/health` | GET | 200 | 500 |
| `/api/ai-chat` | POST | 200 | 400, 500 |
| `/api/access-counter` | GET | 200 | 500 |

---

## 🐛 Debugging

### Verificar se backend está rodando
```bash
# Linux/Mac
lsof -i :3001

# Windows PowerShell
Get-NetTCPConnection -LocalPort 3001
```

### Logs do servidor
O backend já inclui logs automáticos. Ao iniciar, você verá:
```
🚀 Backend rodando na porta 3001
📍 Health check: http://localhost:3001/api/health
🤖 AI Chat endpoint: http://localhost:3001/api/ai-chat
📊 Access Counter: http://localhost:3001/api/access-counter
✅ Configuração da API validada com sucesso!
```

### Ver requisições em tempo real
Todas as requisições são logadas no console do servidor.
