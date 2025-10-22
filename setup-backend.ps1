# Script de Setup do Backend
# Execute este script para configurar o backend pela primeira vez

Write-Host "🚀 Configurando Backend do AI Expert Portfolio..." -ForegroundColor Cyan
Write-Host ""

# Verificar se estamos na raiz do projeto
if (-not (Test-Path "server")) {
    Write-Host "❌ Erro: Execute este script na raiz do projeto!" -ForegroundColor Red
    exit 1
}

# Entrar na pasta do servidor
Set-Location server

# Verificar se package.json existe
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erro: package.json não encontrado!" -ForegroundColor Red
    exit 1
}

# Instalar dependências
Write-Host "📦 Instalando dependências do backend..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependências instaladas com sucesso!" -ForegroundColor Green
Write-Host ""

# Criar arquivo .env se não existir
if (-not (Test-Path ".env")) {
    Write-Host "📝 Criando arquivo .env a partir do exemplo..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Arquivo .env criado!" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANTE: Edite o arquivo server/.env e adicione suas credenciais!" -ForegroundColor Yellow
    Write-Host "   - API_URL: URL da sua API externa" -ForegroundColor White
    Write-Host "   - API_TOKEN: Token de autenticação da API" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "ℹ️  Arquivo .env já existe, mantendo configuração atual" -ForegroundColor Cyan
    Write-Host ""
}

# Voltar para raiz
Set-Location ..

Write-Host "✨ Setup concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. Edite server/.env com suas credenciais" -ForegroundColor White
Write-Host "   2. Execute 'npm run dev:all' para rodar frontend + backend" -ForegroundColor White
Write-Host "   3. Ou execute separadamente:" -ForegroundColor White
Write-Host "      - Backend: cd server && npm run dev" -ForegroundColor White
Write-Host "      - Frontend: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🔗 URLs:" -ForegroundColor Cyan
Write-Host "   - Frontend: http://localhost:8080" -ForegroundColor White
Write-Host "   - Backend: http://localhost:3001" -ForegroundColor White
Write-Host "   - Health Check: http://localhost:3001/api/health" -ForegroundColor White
Write-Host ""
