// Utilitário de proteção de segurança avançada para vídeos do Google Drive

class SecurityProtection {
  constructor() {
    this.isInitialized = false;
    this.violations = 0;
    this.maxViolations = 3;
    this.originalUrl = window.location.href;
    this.tabFocusLost = false;
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    // Não ativar proteção na página de login
    if (window.location.pathname === '/login') {
      console.log('🔓 Proteção de segurança DESABILITADA na página de login');
      return;
    }
    
    this.setupEventListeners();
    this.setupVisibilityMonitoring();
    this.setupUrlMonitoring();
    this.blockDevTools();
    this.isInitialized = true;
    
    console.log('🔒 Sistema de proteção de segurança ativado');
  }

  setupEventListeners() {
    // Bloquear teclas perigosas
    document.addEventListener('keydown', this.blockDangerousKeys.bind(this), true);
    
    // Bloquear menu de contexto
    document.addEventListener('contextmenu', this.blockContextMenu.bind(this), true);
    
    // Bloquear seleção
    document.addEventListener('selectstart', this.blockSelection.bind(this), true);
    
    // Bloquear arrastar
    document.addEventListener('dragstart', this.blockDrag.bind(this), true);
    
    // Monitorar cliques
    document.addEventListener('click', this.monitorClicks.bind(this), true);
    
    // Monitorar toques (mobile)
    document.addEventListener('touchstart', this.monitorTouches.bind(this), true);
    document.addEventListener('touchend', this.monitorTouches.bind(this), true);
  }

  setupVisibilityMonitoring() {
    // Monitorar mudanças de visibilidade (possível abertura de nova aba)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.tabFocusLost = true;
        this.violations++;
        console.warn('⚠️ Possível tentativa de abertura em nova aba detectada');
        
        if (this.violations >= this.maxViolations) {
          this.triggerSecurityAlert();
        }
      } else if (this.tabFocusLost) {
        // Tab voltou ao foco
        this.tabFocusLost = false;
        console.log('🔍 Foco retornado à aba principal');
      }
    });

    // Monitorar foco da janela
    window.addEventListener('blur', () => {
      this.violations++;
      console.warn('⚠️ Janela perdeu foco - possível tentativa de acesso externo');
    });

    window.addEventListener('focus', () => {
      console.log('🔍 Foco retornado à janela principal');
    });
  }

  setupUrlMonitoring() {
    // Monitorar mudanças na URL usando window.history
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window.history.pushState = (...args) => {
      this.checkUrlChange();
      return originalPushState.apply(window.history, args);
    };
    
    window.history.replaceState = (...args) => {
      this.checkUrlChange();
      return originalReplaceState.apply(window.history, args);
    };

    window.addEventListener('popstate', () => {
      this.checkUrlChange();
    });
  }

  checkUrlChange() {
    const currentUrl = window.location.href;
    if (currentUrl !== this.originalUrl && !currentUrl.includes('flowers-frontend')) {
      this.violations += 2; // Violação mais grave
      console.error('🚨 Tentativa de redirecionamento detectada!');
      
      if (this.violations >= this.maxViolations) {
        this.triggerSecurityAlert();
      }
    }
  }

  blockDangerousKeys(e) {
    // Não bloquear teclas na página de login
    if (window.location.pathname === '/login') {
      return;
    }
    
    const dangerousKeys = [
      'F12',
      { ctrl: true, shift: true, key: 'I' }, // Dev Tools
      { ctrl: true, shift: true, key: 'J' }, // Console
      { ctrl: true, shift: true, key: 'C' }, // Inspect
      { ctrl: true, key: 'u' }, // View Source
      { ctrl: true, key: 's' }, // Save
      { ctrl: true, key: 'a' }, // Select All
      { ctrl: true, key: 'c' }, // Copy
      { ctrl: true, key: 'v' }, // Paste
      { ctrl: true, key: 'x' }, // Cut
      { ctrl: true, key: 'p' }, // Print
      { ctrl: true, key: 'f' }, // Find
      { alt: true, key: 'Tab' }, // Alt+Tab
      { cmd: true, key: 'Tab' }, // Cmd+Tab (Mac)
    ];

    const isDangerous = dangerousKeys.some(dangerous => {
      if (typeof dangerous === 'string') {
        return e.key === dangerous;
      }
      
      return (
        (!dangerous.ctrl || e.ctrlKey) &&
        (!dangerous.shift || e.shiftKey) &&
        (!dangerous.alt || e.altKey) &&
        (!dangerous.cmd || e.metaKey) &&
        e.key.toLowerCase() === dangerous.key.toLowerCase()
      );
    });

    if (isDangerous) {
      e.preventDefault();
      e.stopPropagation();
      this.violations++;
      console.warn('⚠️ Tentativa de usar tecla bloqueada:', e.key);
      return false;
    }
  }

  blockContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    this.violations++;
    console.warn('⚠️ Tentativa de abrir menu de contexto bloqueada');
    return false;
  }

  blockSelection(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  blockDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  monitorClicks(e) {
    // Não monitorar cliques na página de login
    if (window.location.pathname === '/login') {
      return;
    }
    
    // Detectar cliques suspeitos (área dos botões do Google Drive)
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX;
    const clickY = e.clientY;
    
    // Se o clique foi na área superior direita (onde ficam os botões)
    const isInDangerZone = (
      clickX > window.innerWidth * 0.8 && 
      clickY < window.innerHeight * 0.2
    );

    if (isInDangerZone) {
      e.preventDefault();
      e.stopPropagation();
      this.violations++;
      console.warn('⚠️ Clique em área protegida bloqueado');
      return false;
    }
  }

  monitorTouches(e) {
    // Monitorar toques em áreas sensíveis (mobile)
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      const touchX = touch.clientX;
      const touchY = touch.clientY;
      
      // Área de perigo no mobile (canto superior direito expandido)
      const isInMobileDangerZone = (
        touchX > window.innerWidth * 0.75 && 
        touchY < window.innerHeight * 0.25
      );

      if (isInMobileDangerZone) {
        e.preventDefault();
        e.stopPropagation();
        this.violations++;
        console.warn('⚠️ Toque em área protegida bloqueado (mobile)');
        return false;
      }
    }

    // Bloquear gestos multi-touch (pinça para zoom)
    if (e.touches && e.touches.length > 1) {
      e.preventDefault();
      e.stopPropagation();
      console.warn('⚠️ Gesto multi-touch bloqueado');
      return false;
    }
  }

  blockDevTools() {
    // Detectar se DevTools está aberto
    let devtools = {
      open: false,
      orientation: null
    };

    const threshold = 160;

    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          this.violations += 3; // Violação grave
          console.error('🚨 DevTools detectado!');
          this.triggerSecurityAlert();
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Detectar debugger
    setInterval(() => {
      const start = performance.now();
      debugger; // eslint-disable-line no-debugger
      const end = performance.now();
      
      if (end - start > 100) {
        this.violations += 3;
        console.error('🚨 Debugger detectado!');
        this.triggerSecurityAlert();
      }
    }, 1000);
  }

  triggerSecurityAlert() {
    // Não disparar alertas na página de login
    if (window.location.pathname === '/login') {
      console.log('🔓 Alerta de segurança ignorado na página de login');
      return;
    }
    
    console.error('🚨 ALERTA DE SEGURANÇA: Muitas violações detectadas!');
    
    // Opcional: redirecionar para página de aviso
    // window.location.href = '/security-warning';
    
    // Opcional: enviar alerta para o servidor
    this.reportSecurityViolation();
  }

  reportSecurityViolation() {
    // Não reportar violações na página de login
    if (window.location.pathname === '/login') {
      console.log('🔒 Proteção desabilitada na página de login');
      return;
    }
    
    try {
      fetch('/api/security-violation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          violations: this.violations,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      }).catch(() => {
        // Falha silenciosa se não conseguir reportar
      });
    } catch (error) {
      // Falha silenciosa
    }
  }

  destroy() {
    // Limpar event listeners se necessário
    this.isInitialized = false;
  }
}

// Instância global - DESABILITADA TEMPORARIAMENTE
// window.securityProtection = new SecurityProtection();

export default SecurityProtection; 