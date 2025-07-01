// Chave simples para criptografia (em produção, use uma chave mais segura)
const SECRET_KEY = 'FlowersConference2025SecretKey';

// Função para codificar Base64 de forma segura para URL
const base64UrlEncode = (str) => {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

// Função para decodificar Base64 de forma segura para URL
const base64UrlDecode = (str) => {
  // Adicionar padding se necessário
  const padding = '='.repeat((4 - str.length % 4) % 4);
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/') + padding;
  return atob(base64);
};

// Função simples de XOR para criptografia
const xorCrypt = (text, key) => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
};

// Criptografar URL
export const encryptUrl = (url) => {
  try {
    // Adicionar timestamp para tornar cada criptografia única
    const timestamp = Date.now().toString();
    const dataToEncrypt = `${url}|${timestamp}`;
    
    // Criptografar usando XOR
    const encrypted = xorCrypt(dataToEncrypt, SECRET_KEY);
    
    // Codificar em Base64 seguro para URL
    const encoded = base64UrlEncode(encrypted);
    
    return encoded;
  } catch (error) {
    console.error('Erro ao criptografar URL:', error);
    return btoa(url); // Fallback para Base64 simples
  }
};

// Descriptografar URL
export const decryptUrl = (encryptedUrl) => {
  if (!encryptedUrl || encryptedUrl.trim() === '') {
    console.error('❌ URL criptografada está vazia');
    return '';
  }

  try {
    // Decodificar Base64
    const decoded = base64UrlDecode(encryptedUrl);
    
    // Descriptografar usando XOR
    const decrypted = xorCrypt(decoded, SECRET_KEY);
    
    // Separar URL do timestamp
    const parts = decrypted.split('|');
    
    if (parts.length < 2) {
      // Pode ser uma URL no formato antigo
      return decrypted;
    }
    
    const [url, timestamp] = parts;
    
    // Verificar se o timestamp não é muito antigo (opcional - 24 horas)
    const now = Date.now();
    const urlTimestamp = parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 horas em milliseconds
    
    if (isNaN(urlTimestamp)) {
      return url;
    }
    
    if (now - urlTimestamp > maxAge) {
      console.warn('⚠️ URL expirada, mas permitindo acesso');
    }
    
    return url;
    
  } catch (error) {
    console.error('❌ Erro na descriptografia:', error.message);
    
    // Fallback 1: Tentar decodificação Base64 simples
    try {
      const fallback1 = atob(encryptedUrl);
      return fallback1;
    } catch (fallbackError1) {
      
      // Fallback 2: Tentar decodificação de URL
      try {
        const fallback2 = decodeURIComponent(encryptedUrl);
        return fallback2;
      } catch (fallbackError2) {
        
        // Fallback 3: Retornar a string original
        console.log('🔄 Usando string original como último recurso');
        return encryptedUrl;
      }
    }
  }
};

// Função para verificar se uma URL é do Google Drive
export const isGoogleDriveUrl = (url) => {
  return url && url.includes('drive.google.com');
};

// Função para converter URL do Google Drive para embed com proteções máximas
export const getSecureGoogleDriveEmbedUrl = (url) => {
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    const fileId = match[1];
    // Usar parâmetros ultra-restritivos para esconder todos os controles possíveis
    const params = new URLSearchParams({
      'usp': 'embed_facebook',
      'rm': 'minimal',
      'chrome': 'false',
      'embedded': 'true',
      'widget': 'true',
      'ddrp': '1',
      'hl': 'pt-BR',
      'authuser': '0',
      'nonce': Date.now().toString(),
      'single': 'true',
      'gd': 'true',
      'headers': 'false',
      'controls': 'false',
      'modestbranding': '1',
      'showinfo': '0',
      'rel': '0',
      'fs': '0',
      'iv_load_policy': '3',
      'disablekb': '1',
      'playsinline': '1',
      'origin': window.location.origin
    });
    
    return `https://drive.google.com/file/d/${fileId}/preview?${params.toString()}`;
  }
  return null;
}; 