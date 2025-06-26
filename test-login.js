// SCRIPT DE TESTE - Execute no console do browser (F12)
// Copie e cole este código no console da página de login

async function testLogin() {
  console.log('=== TESTE DE LOGIN ===');
  
  const email = prompt('Digite seu email:');
  const password = prompt('Digite sua senha:');
  
  if (!email || !password) {
    console.log('❌ Email e senha são obrigatórios');
    return;
  }
  
  try {
    console.log('1. Testando conectividade...');
    const healthResponse = await fetch('https://flowers-backend-1d1a3a96fecc.herokuapp.com/health');
    const healthData = await healthResponse.json();
    console.log('✅ Backend conectado:', healthData);
    
    console.log('2. Testando login...');
    const loginResponse = await fetch('https://flowers-backend-1d1a3a96fecc.herokuapp.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    
    console.log('Status do login:', loginResponse.status);
    console.log('Headers de resposta:', [...loginResponse.headers.entries()]);
    
    const loginData = await loginResponse.json();
    console.log('Dados do login:', loginData);
    
    if (loginResponse.ok) {
      console.log('3. Testando verificação de token...');
      
      // Aguardar um pouco para o cookie ser definido
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const verifyResponse = await fetch('https://flowers-backend-1d1a3a96fecc.herokuapp.com/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      console.log('Status da verificação:', verifyResponse.status);
      
      if (verifyResponse.ok) {
        const verifyData = await verifyResponse.json();
        console.log('✅ Verificação bem-sucedida:', verifyData);
      } else {
        const errorText = await verifyResponse.text();
        console.log('❌ Erro na verificação:', errorText);
      }
      
      console.log('4. Cookies disponíveis:', document.cookie);
      
    } else {
      console.log('❌ Erro no login:', loginData);
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

// Execute a função
testLogin(); 