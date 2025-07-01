// Utilitário para limpar completamente o cache do navegador

export const clearAllCache = async () => {
  console.log('🧹 Iniciando limpeza completa do cache...');
  
  try {
    // 1. Limpar localStorage
    console.log('🗑️ Limpando localStorage...');
    const cacheKeys = Object.keys(localStorage).filter(key => 
      key.startsWith('video_cache_') || 
      key.startsWith('video_metadata_') ||
      key.includes('cache')
    );
    
    cacheKeys.forEach(key => {
      localStorage.removeItem(key);
      console.log('🗑️ Removido do localStorage:', key);
    });
    
    // 2. Limpar sessionStorage
    console.log('🗑️ Limpando sessionStorage...');
    sessionStorage.clear();
    
    // 3. Desregistrar Service Workers
    if ('serviceWorker' in navigator) {
      console.log('🗑️ Desregistrando Service Workers...');
      const registrations = await navigator.serviceWorker.getRegistrations();
      
      for (let registration of registrations) {
        console.log('🗑️ Desregistrando:', registration.scope);
        await registration.unregister();
      }
    }
    
    // 4. Limpar Cache API
    if ('caches' in window) {
      console.log('🗑️ Limpando Cache API...');
      const cacheNames = await caches.keys();
      
      for (let cacheName of cacheNames) {
        console.log('🗑️ Removendo cache:', cacheName);
        await caches.delete(cacheName);
      }
    }
    
    // 5. Limpar IndexedDB (se existir)
    if ('indexedDB' in window) {
      console.log('🗑️ Tentando limpar IndexedDB...');
      // IndexedDB é mais complexo, mas vamos tentar
      try {
        const databases = await indexedDB.databases();
        for (let db of databases) {
          if (db.name && db.name.includes('cache')) {
            console.log('🗑️ Removendo IndexedDB:', db.name);
            indexedDB.deleteDatabase(db.name);
          }
        }
      } catch (e) {
        console.log('⚠️ IndexedDB cleanup não suportado:', e.message);
      }
    }
    
    console.log('✅ Limpeza completa do cache finalizada!');
    
    // 6. Recarregar página
    console.log('🔄 Recarregando página em 2 segundos...');
    setTimeout(() => {
      window.location.reload(true); // Hard reload
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro durante limpeza do cache:', error);
  }
};

// Função para executar automaticamente na inicialização
export const autoCleanCache = () => {
  // Verificar se há Service Workers ativos que podem causar problemas
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      if (registrations.length > 0) {
        console.log('⚠️ Service Workers detectados, iniciando limpeza automática...');
        
        // Aguardar um pouco para não interferir com a inicialização da página
        setTimeout(() => {
          clearAllCache();
        }, 2000);
      } else {
        console.log('✅ Nenhum Service Worker detectado, sistema limpo');
      }
    });
  }
}; 