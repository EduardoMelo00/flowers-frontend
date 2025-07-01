// Sistema de cache avançado para vídeos
class VideoCache {
  constructor() {
    this.cache = new Map();
    this.preloadQueue = [];
    this.isPreloading = false;
    this.maxCacheSize = 3; // Máximo 3 vídeos em cache
    this.chunkSize = 1024 * 1024; // 1MB chunks
    this.prefetchAmount = 10 * 1024 * 1024; // 10MB de prefetch
    this.init();
  }

  init() {
    // Limpar cache antigo ao iniciar
    this.clearOldCache();
    
    // Monitorar conexão de rede
    this.setupNetworkMonitoring();
    
    // Configurar service worker se disponível
    this.setupServiceWorker();
  }

  // Configurar monitoramento de rede
  setupNetworkMonitoring() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      // Ajustar estratégia baseado na conexão
      const updateCacheStrategy = () => {
        const effectiveType = connection.effectiveType;
        
        switch (effectiveType) {
          case 'slow-2g':
          case '2g':
            this.maxCacheSize = 1;
            this.prefetchAmount = 2 * 1024 * 1024; // 2MB
            break;
          case '3g':
            this.maxCacheSize = 2;
            this.prefetchAmount = 5 * 1024 * 1024; // 5MB
            break;
          case '4g':
          default:
            this.maxCacheSize = 3;
            this.prefetchAmount = 10 * 1024 * 1024; // 10MB
            break;
        }
        
        console.log(`📡 Conexão: ${effectiveType}, Cache: ${this.maxCacheSize} vídeos, Prefetch: ${this.prefetchAmount / 1024 / 1024}MB`);
      };
      
      updateCacheStrategy();
      connection.addEventListener('change', updateCacheStrategy);
    }
  }

  // Configurar Service Worker para cache (DESREGISTRAR COMPLETAMENTE)
  async setupServiceWorker() {
    console.log('🗑️ Desregistrando Service Workers existentes...');
    
    if ('serviceWorker' in navigator) {
      try {
        // Desregistrar todos os Service Workers
        const registrations = await navigator.serviceWorker.getRegistrations();
        
        for (let registration of registrations) {
          console.log('🗑️ Desregistrando SW:', registration.scope);
          await registration.unregister();
        }
        
        console.log('✅ Todos os Service Workers foram desregistrados');
        
        // Recarregar a página para limpar completamente
        if (registrations.length > 0) {
          console.log('🔄 Recarregando página para limpar Service Workers...');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        
      } catch (error) {
        console.error('❌ Erro ao desregistrar Service Workers:', error);
      }
    }
  }

  // Limpar cache antigo
  clearOldCache() {
    const oldCacheKeys = Object.keys(localStorage).filter(key => 
      key.startsWith('video_cache_') || key.startsWith('video_metadata_')
    );
    
    oldCacheKeys.forEach(key => {
      const timestamp = localStorage.getItem(key + '_timestamp');
      const now = Date.now();
      const maxAge = 24 * 60 * 60 * 1000; // 24 horas
      
      if (!timestamp || (now - parseInt(timestamp)) > maxAge) {
        localStorage.removeItem(key);
        localStorage.removeItem(key + '_timestamp');
      }
    });
  }

  // Gerar chave de cache
  getCacheKey(url) {
    return `video_cache_${btoa(url).replace(/[^a-zA-Z0-9]/g, '')}`;
  }

  // Verificar se vídeo está em cache
  isInCache(url) {
    const key = this.getCacheKey(url);
    return this.cache.has(key) || localStorage.getItem(key) !== null;
  }

  // Obter vídeo do cache
  async getFromCache(url) {
    const key = this.getCacheKey(url);
    
    // Tentar cache em memória primeiro
    if (this.cache.has(key)) {
      console.log('🎯 Vídeo encontrado no cache em memória:', url);
      return this.cache.get(key);
    }
    
    // Tentar localStorage
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
      try {
        const blob = this.base64ToBlob(cachedData);
        const videoUrl = URL.createObjectURL(blob);
        
        // Adicionar ao cache em memória
        this.cache.set(key, videoUrl);
        
        console.log('💾 Vídeo encontrado no localStorage:', url);
        return videoUrl;
      } catch (error) {
        console.error('❌ Erro ao recuperar do localStorage:', error);
        localStorage.removeItem(key);
      }
    }
    
    return null;
  }

  // Adicionar vídeo ao cache
  async addToCache(url, videoBlob) {
    const key = this.getCacheKey(url);
    
    try {
      // Limitar tamanho do cache
      this.enforceMaxCacheSize();
      
      // Criar URL do blob
      const videoUrl = URL.createObjectURL(videoBlob);
      
      // Adicionar ao cache em memória
      this.cache.set(key, videoUrl);
      
      // Se o vídeo for pequeno o suficiente, salvar no localStorage
      if (videoBlob.size < 50 * 1024 * 1024) { // 50MB máximo
        const base64Data = await this.blobToBase64(videoBlob);
        localStorage.setItem(key, base64Data);
        localStorage.setItem(key + '_timestamp', Date.now().toString());
        localStorage.setItem(key + '_size', videoBlob.size.toString());
      }
      
      console.log(`✅ Vídeo adicionado ao cache (${(videoBlob.size / 1024 / 1024).toFixed(2)}MB):`, url);
      
    } catch (error) {
      console.error('❌ Erro ao adicionar ao cache:', error);
    }
  }

  // Forçar limite do cache
  enforceMaxCacheSize() {
    if (this.cache.size >= this.maxCacheSize) {
      // Remover o mais antigo (FIFO)
      const firstKey = this.cache.keys().next().value;
      const videoUrl = this.cache.get(firstKey);
      
      // Revogar URL do blob
      if (videoUrl && videoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(videoUrl);
      }
      
      this.cache.delete(firstKey);
      localStorage.removeItem(firstKey);
      localStorage.removeItem(firstKey + '_timestamp');
      localStorage.removeItem(firstKey + '_size');
      
      console.log('🗑️ Cache limpo - removido vídeo mais antigo');
    }
  }

  // Precarregar vídeo
  async preloadVideo(url, priority = 'low') {
    // Pular preload para URLs do S3 devido a CORS
    if (url.includes('amazonaws.com')) {
      console.log('⚠️ Pulando preload de URL do S3:', url);
      return;
    }

    if (this.isInCache(url)) {
      console.log('⚡ Vídeo já está em cache:', url);
      return;
    }

    // Adicionar à fila de preload
    this.preloadQueue.push({ url, priority });
    
    // Iniciar preload se não estiver rodando
    if (!this.isPreloading) {
      this.processPreloadQueue();
    }
  }

  // Processar fila de preload
  async processPreloadQueue() {
    if (this.preloadQueue.length === 0) {
      this.isPreloading = false;
      return;
    }

    this.isPreloading = true;
    
    // Ordenar por prioridade
    this.preloadQueue.sort((a, b) => {
      const priorities = { high: 3, medium: 2, low: 1 };
      return priorities[b.priority] - priorities[a.priority];
    });

    const { url } = this.preloadQueue.shift();
    
    try {
      console.log('⬇️ Precarregando vídeo:', url);
      
      const response = await fetch(url, {
        headers: {
          'Range': `bytes=0-${this.prefetchAmount - 1}`
        }
      });
      
      if (response.ok) {
        const blob = await response.blob();
        await this.addToCache(url, blob);
      }
      
    } catch (error) {
      console.error('❌ Erro no preload:', error);
    }
    
    // Continuar processando a fila
    setTimeout(() => this.processPreloadQueue(), 100);
  }

  // Carregar vídeo com cache (SIMPLIFICADO)
  async loadVideo(url, onProgress) {
    // Para todas as URLs, simplesmente retornar a URL original
    // Cache desabilitado temporariamente devido a problemas CORS
    console.log('🎬 Carregando vídeo diretamente (cache desabilitado):', url);
    
    if (onProgress) {
      // Simular progresso para UX
      setTimeout(() => onProgress(100), 100);
    }
    
    return url;
  }

  // Converter blob para base64
  blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Converter base64 para blob
  base64ToBlob(base64Data) {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'video/mp4' });
  }

  // Limpar cache completamente
  clearCache() {
    // Revogar URLs dos blobs
    this.cache.forEach(videoUrl => {
      if (videoUrl && videoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(videoUrl);
      }
    });
    
    this.cache.clear();
    
    // Limpar localStorage
    const cacheKeys = Object.keys(localStorage).filter(key => 
      key.startsWith('video_cache_') || key.startsWith('video_metadata_')
    );
    
    cacheKeys.forEach(key => localStorage.removeItem(key));
    
    console.log('🗑️ Cache de vídeo limpo completamente');
  }

  // Obter estatísticas do cache
  getCacheStats() {
    const memoryCache = this.cache.size;
    const localStorageItems = Object.keys(localStorage).filter(key => 
      key.startsWith('video_cache_')
    ).length;
    
    let totalSize = 0;
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('video_cache_') && key.endsWith('_size')) {
        totalSize += parseInt(localStorage.getItem(key) || '0');
      }
    });
    
    return {
      memoryCache,
      localStorageItems,
      totalSizeMB: (totalSize / 1024 / 1024).toFixed(2),
      maxCacheSize: this.maxCacheSize
    };
  }
}

// Instância global
const videoCache = new VideoCache();

export default videoCache; 