import React, { useState, useEffect, useRef } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  style = {}, 
  priority = false,
  quality = 'auto',
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);
  const [optimizedSrc, setOptimizedSrc] = useState(null);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px' // Carregar quando estiver 100px antes de aparecer
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  // Otimizar imagem baseado no tamanho da tela
  useEffect(() => {
    if (!isVisible || !src) return;

    const optimizeImage = () => {
      const screenWidth = window.innerWidth;
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      // Determinar tamanho ideal baseado na tela
      let targetWidth;
      if (screenWidth <= 480) {
        targetWidth = Math.min(300, screenWidth * devicePixelRatio);
      } else if (screenWidth <= 768) {
        targetWidth = Math.min(400, screenWidth * 0.5 * devicePixelRatio);
      } else {
        targetWidth = Math.min(500, screenWidth * 0.3 * devicePixelRatio);
      }

      // Se a imagem for muito pesada (pod-gabi.png, pod-aline.png), criar versão reduzida
      if (src.includes('pod-gabi.png') || src.includes('pod-aline.png') || src.includes('Dia 2.png')) {
        createOptimizedVersion(src, targetWidth);
      } else {
        setOptimizedSrc(src);
      }
    };

    optimizeImage();
  }, [isVisible, src]);

  // Criar versão otimizada da imagem
  const createOptimizedVersion = (originalSrc, targetWidth) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calcular dimensões mantendo aspect ratio
      const aspectRatio = img.height / img.width;
      canvas.width = targetWidth;
      canvas.height = targetWidth * aspectRatio;
      
      // Desenhar imagem redimensionada
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Converter para blob com compressão
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const optimizedUrl = URL.createObjectURL(blob);
            setOptimizedSrc(optimizedUrl);
          } else {
            setOptimizedSrc(originalSrc); // Fallback
          }
        },
        'image/jpeg',
        0.7 // 70% de qualidade para reduzir tamanho
      );
    };
    
    img.onerror = () => {
      setOptimizedSrc(originalSrc); // Fallback em caso de erro
    };
    
    img.src = originalSrc;
  };

  // Cleanup de URLs criadas
  useEffect(() => {
    return () => {
      if (optimizedSrc && optimizedSrc.startsWith('blob:')) {
        URL.revokeObjectURL(optimizedSrc);
      }
    };
  }, [optimizedSrc]);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setLoaded(true);
  };

  return (
    <div 
      ref={imgRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#1a1a1a',
        ...style
      }}
      {...props}
    >
      {/* Skeleton loading */}
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            zIndex: 1
          }}
        />
      )}

      {/* Imagem otimizada */}
      {optimizedSrc && (
        <img
          src={optimizedSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease-in-out',
            position: 'relative',
            zIndex: 2
          }}
        />
      )}

      {/* Indicador de erro */}
      {error && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#666',
            fontSize: '12px',
            textAlign: 'center',
            zIndex: 3
          }}
        >
          ⚠️<br />Erro ao carregar
        </div>
      )}

      {/* CSS para animação do skeleton */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage; 