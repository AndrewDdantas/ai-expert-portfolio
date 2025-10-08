// Teste para verificar se as variáveis de ambiente estão sendo carregadas
console.log('=== TESTE DE VARIÁVEIS DE AMBIENTE ===');
console.log('VITE_API_TOKEN:', import.meta.env.VITE_API_TOKEN ? '✓ Definido' : '✗ Não encontrado');
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL ? '✓ Definido' : '✗ Não encontrado');
console.log('DEV mode:', import.meta.env.DEV);
console.log('PROD mode:', import.meta.env.PROD);
console.log('Todas as variáveis env:', Object.keys(import.meta.env));