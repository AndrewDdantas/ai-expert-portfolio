# Configuração de Segurança - API

## Variáveis de Ambiente

Este projeto utiliza variáveis de ambiente para manter informações sensíveis (como tokens de API e URLs) seguras e fora do código-fonte.

### Configuração Local

1. Copie o arquivo `.env.example` para `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` com suas credenciais reais:
   ```env
   VITE_API_TOKEN=seu_token_real_aqui
   VITE_API_URL=sua_url_da_api_aqui
   ```

### Segurança

- ✅ **O arquivo `.env` está no `.gitignore`** - nunca será commitado
- ✅ **URL da API é mascarada por proxy** - não aparece no código do frontend
- ✅ **Token é carregado via variáveis de ambiente** - não hardcoded no código
- ✅ **Configuração centralizada** - fácil de gerenciar

### Como Funciona

1. **Desenvolvimento**: O Vite proxy redireciona `/api/*` para a URL real da API
2. **Produção**: Configure as variáveis de ambiente no seu provedor de hosting
3. **Token**: Sempre carregado via `import.meta.env.VITE_API_TOKEN`

### Deployment

Para produção, configure as variáveis de ambiente no seu provedor:

**Vercel/Netlify:**

- Adicione `VITE_API_TOKEN` e `VITE_API_URL` nas configurações do projeto

**Docker:**

```dockerfile
ENV VITE_API_TOKEN=seu_token
ENV VITE_API_URL=sua_url
```

**Servidor próprio:**

```bash
export VITE_API_TOKEN=seu_token
export VITE_API_URL=sua_url
```

### Verificação

O código verifica automaticamente se as variáveis estão configuradas. Se não estiverem, exibirá uma mensagem de erro apropriada ao usuário.
