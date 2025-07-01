import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from  './videoPage.css';
import { decryptUrl, isGoogleDriveUrl, getSecureGoogleDriveEmbedUrl } from '../../utils/urlCrypto';


const VideoPlayerPage = () => {
  const { id } = useParams();
  
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
    
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <div className="video-live" style={{ 
      userSelect: 'none', 
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none'
    }}>
      {isGoogleDrive && googleDriveEmbedUrl ? (
        <div style={{ position: 'relative', width: '1024px', height: '680px', margin: '0 auto' }}>
          <iframe
            src={googleDriveEmbedUrl}
            width="1024"
            height="680"
            allow="autoplay"
            allowFullScreen
            frameBorder="0"
            style={{ 
              backgroundColor: 'black',
              pointerEvents: 'auto',
              userSelect: 'none',
              WebkitUserSelect: 'none'
            }}
            sandbox="allow-scripts allow-same-origin allow-presentation"
            onContextMenu={(e) => e.preventDefault()}
            onLoad={() => {
              // Tentar esconder botões do Google Drive após carregar
              try {
                const iframe = document.querySelector('iframe');
                if (iframe && iframe.contentDocument) {
                  const style = iframe.contentDocument.createElement('style');
                  style.textContent = `
                    .ndfHFb-c4YZDc-GSQQnc-LgbsSe,
                    .ndfHFb-c4YZDc-to915-LgbsSe,
                    .ndfHFb-c4YZDc-Wrql6b-LgbsSe,
                    [data-tooltip="Abrir em nova guia"],
                    [data-tooltip="Open in new tab"],
                    [aria-label*="nova"],
                    [aria-label*="new"],
                    .drive-viewer-toolstrip,
                    .drive-viewer-nav,
                    .ndfHFb-c4YZDc-GSQQnc,
                    .ndfHFb-c4YZDc-to915,
                    .ndfHFb-c4YZDc-Wrql6b {
                      display: none !important;
                      visibility: hidden !important;
                      opacity: 0 !important;
                    }
                  `;
                  iframe.contentDocument.head.appendChild(style);
                }
              } catch (e) {
                // Falha silenciosa devido a restrições CORS
                console.log('Não foi possível acessar o conteúdo do iframe devido a restrições CORS');
              }
            }}
          />
          {/* Overlay discreto para cobrir botões */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '80px',
              height: '50px',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
              zIndex: 10,
              pointerEvents: 'auto',
              borderRadius: '0 0 0 12px',
              backdropFilter: 'blur(2px)'
            }} 
            onClick={(e) => e.preventDefault()}
          />
          {/* Overlay sutil na parte inferior */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '25px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.4))',
            zIndex: 5,
            pointerEvents: 'none'
          }} />
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
