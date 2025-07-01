import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from  './videoPage.css';
import { decryptUrl, isGoogleDriveUrl, getSecureGoogleDriveEmbedUrl } from '../../utils/urlCrypto';
import '../../utils/securityProtection';


const VideoPlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Descriptografar a URL
  const decodedVideoUrl = decryptUrl(id);

  // Verificar se é uma URL do Google Drive
  const isGoogleDrive = isGoogleDriveUrl(decodedVideoUrl);
  const googleDriveEmbedUrl = isGoogleDrive ? getSecureGoogleDriveEmbedUrl(decodedVideoUrl) : null;

  // Adicionar proteções extras contra download
  useEffect(() => {
    // Bloquear menu de contexto (botão direito)
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };
    
    // Bloquear teclas de desenvolvedor e atalhos de download
    const handleKeyDown = (e) => {
      // Bloquear F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S, etc.
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.key === 'u') ||
          (e.ctrlKey && e.key === 's') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C') ||
          (e.ctrlKey && e.shiftKey && e.key === 'J')) {
        e.preventDefault();
        return false;
      }
    };

    // Bloquear seleção de texto
    const handleSelectStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Bloquear arrastar
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Detectar e bloquear tentativas de abrir em nova aba
    const handleBeforeUnload = (e) => {
      // Tentar bloquear navegação
      e.preventDefault();
      e.returnValue = '';
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Detectar mudanças de foco (possível abertura de nova aba)
    let isPageVisible = true;
    const handleVisibilityChange = () => {
      if (document.hidden && isPageVisible) {
        // Página ficou oculta, possível abertura de nova aba
        console.log('⚠️ Possível tentativa de abertura em nova aba detectada');
        isPageVisible = false;
      } else if (!document.hidden && !isPageVisible) {
        // Página voltou a ficar visível
        isPageVisible = true;
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="video-live" style={{ 
      userSelect: 'none', 
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      touchAction: 'manipulation'
    }}>
      {/* Botão Voltar */}
      <div className="back-button-container" style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 3000
      }}>
        <button 
          onClick={() => navigate('/welcome')}
          className="back-button"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
            fontFamily: 'Arial, sans-serif'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
          }}
        >
          ← Voltar para a página principal
        </button>
      </div>
      {isGoogleDrive && googleDriveEmbedUrl ? (
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '1024px', 
          height: '680px', 
          margin: '0 auto',
          overflow: 'hidden',
          border: '2px solid #333',
          borderRadius: '8px',
          backgroundColor: 'black'
        }}>
          <iframe
            src={googleDriveEmbedUrl}
            width="100%"
            height="100%"
            allow="autoplay"
            allowFullScreen
            frameBorder="0"
            style={{ 
              backgroundColor: 'black',
              pointerEvents: 'auto',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              border: 'none',
              outline: 'none'
            }}
            sandbox="allow-scripts allow-same-origin allow-presentation"
            onContextMenu={(e) => e.preventDefault()}
            title="Video Player"
          />
          
          {/* SISTEMA DE PROTEÇÃO MULTICAMADAS */}
          
          {/* Camada 1: Proteção do canto superior direito (botão principal) */}
          <div 
            className="protection-overlay-main"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 'clamp(80px, 15%, 150px)',
              height: 'clamp(50px, 12%, 80px)',
              background: 'transparent',
              zIndex: 2000,
              pointerEvents: 'auto',
              cursor: 'default',
              borderRadius: '0 8px 0 0'
            }} 
            onClick={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
              return false;
            }}
            onTouchStart={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
              return false;
            }}
            onTouchEnd={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
              return false;
            }}
            onMouseDown={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
              return false;
            }}
          />
          
          {/* Camada 2: Proteção expandida para mobile */}
          <div 
            className="protection-overlay-mobile"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 'clamp(120px, 25%, 200px)',
              height: 'clamp(60px, 15%, 100px)',
              background: 'transparent',
              zIndex: 1999,
              pointerEvents: 'auto',
              cursor: 'default'
            }} 
            onClick={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
              return false;
            }}
            onTouchStart={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
              return false;
            }}
            onTouchEnd={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
              return false;
            }}
          />
          
          {/* Camada 3: Proteção da barra de ferramentas inferior */}
          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 'clamp(40px, 8%, 60px)',
              background: 'transparent',
              zIndex: 1998,
              pointerEvents: 'auto',
              cursor: 'default'
            }} 
            onClick={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
              return false;
            }}
            onTouchStart={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
              return false;
            }}
          />
          
          {/* Camada 4: Proteção lateral direita (menu mobile) */}
          <div 
            style={{
              position: 'absolute',
              top: '15%',
              right: 0,
              width: 'clamp(40px, 10%, 80px)',
              height: '70%',
              background: 'transparent',
              zIndex: 1997,
              pointerEvents: 'auto',
              cursor: 'default'
            }} 
            onClick={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
              return false;
            }}
            onTouchStart={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
              return false;
            }}
          />
          
          {/* Camada 5: Proteção do canto superior esquerdo (logo/menu) */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 'clamp(100px, 20%, 180px)',
              height: 'clamp(50px, 12%, 80px)',
              background: 'transparent',
              zIndex: 1996,
              pointerEvents: 'auto',
              cursor: 'default'
            }} 
            onClick={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
              return false;
            }}
            onTouchStart={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
              return false;
            }}
          />
          
          {/* Camada 6: Interceptador de gestos multi-touch */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'transparent',
              zIndex: 1000,
              pointerEvents: 'none',
              touchAction: 'none'
            }}
            onTouchStart={(e) => {
              // Bloquear gestos multi-touch (pinça para zoom)
              if (e.touches.length > 1) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
            }}
            onTouchMove={(e) => {
              if (e.touches.length > 1) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
            }}
          />
          
          {/* Camada 7: Proteção visual com gradiente sutil */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '60px',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.3))',
              zIndex: 500,
              pointerEvents: 'none',
              borderRadius: '0 8px 0 8px',
              backdropFilter: 'blur(1px)'
            }}
          />
        </div>
      ) : (
        <video 
          width="1024" 
          height="680" 
          controls 
          controlsList="nodownload noremoteplayback nofullscreen" 
          onContextMenu={(e) => e.preventDefault()} 
          autoPlay 
          muted 
          onError={(e) => console.error('Video error:', e)}
          style={{ 
            userSelect: 'none',
            WebkitUserSelect: 'none'
          }}
        >
          <source src={decodedVideoUrl} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

export default VideoPlayerPage;
