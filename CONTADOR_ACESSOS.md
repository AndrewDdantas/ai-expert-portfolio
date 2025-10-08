# Contador de Acessos - Portfolio

## 📊 Funcionalidades

Este sistema de contador de acessos foi implementado para monitorar as visitas ao portfolio de forma inteligente e não invasiva.

### ✨ Características Principais

- **📈 Contagem Inteligente**: Distingue entre visitas únicas e retornos
- **🕒 Sessões Temporais**: Nova visita após 30 minutos de inatividade
- **📅 Estatísticas Diárias**: Contador de visitas do dia atual
- **💾 Persistência Local**: Dados salvos no localStorage do navegador
- **🔄 Tempo Real**: Atualização automática dos contadores
- **📱 Responsivo**: Interface adaptativa para todos os dispositivos

### 📍 Onde Encontrar

1. **Footer (Compacto)**: Contador simples com total de visitas
2. **Seção Estatísticas**: Dashboard completo com métricas detalhadas
3. **Menu de Navegação**: Link direto para as estatísticas

### 🔢 Métricas Disponíveis

| Métrica | Descrição |
|---------|-----------|
| **Total de Visitas** | Número total de sessões registradas |
| **Visitantes Únicos** | Contagem de visitas com intervalo >30min |
| **Visitas Hoje** | Número de acessos no dia atual |
| **Última Visita** | Data da última sessão registrada |

### 🛡️ Privacidade

- ✅ **Dados Locais**: Tudo armazenado no navegador do usuário
- ✅ **Sem Cookies**: Não utiliza cookies de terceiros
- ✅ **Sem Rastreamento**: Não coleta dados pessoais
- ✅ **Anônimo**: IDs temporários apenas para contagem

### 🔧 Funcionalidades Técnicas

#### Hook `useAccessCounter`
```typescript
const { counter, isLoading, resetCounter } = useAccessCounter();
```

#### Componente de Exibição
```typescript
<AccessCounterDisplay 
  variant="compact" | "full"
  showDebug={true} // Apenas em desenvolvimento
/>
```

### 🎯 Lógica de Contagem

1. **Primeira Visita**: Cria ID único para o visitante
2. **Visita Recorrente**: Verifica tempo desde última visita
3. **Nova Sessão**: Se passou >30min, conta como nova visita
4. **Mesmo Dia**: Mantém contador diário até meia-noite
5. **Persistência**: Salva dados no localStorage

### 🚀 Desenvolvimento

#### Reset do Contador (DEV)
Em modo de desenvolvimento, um botão "Reset" está disponível na seção de estatísticas para facilitar testes.

#### Debug
```javascript
// Verificar dados salvos
localStorage.getItem('portfolio_access_counter')
localStorage.getItem('portfolio_visitor_id')
```

### 📈 Evolução Futura

- [ ] Integração com analytics backend
- [ ] Gráficos temporais de visitas
- [ ] Estatísticas geográficas (com permissão)
- [ ] Dashboard administrativo
- [ ] Exportação de dados

### 🎨 Personalização

O componente utiliza o sistema de design do portfolio, adaptando-se automaticamente aos temas claro/escuro e mantendo consistência visual com o resto da aplicação.