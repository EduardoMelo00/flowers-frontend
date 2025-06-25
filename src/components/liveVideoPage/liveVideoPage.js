import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import './liveVideoPage.css';

const LiveVideoPage = () => {
    const [countdown, setCountdown] = useState(5);
    const [showVideo, setShowVideo] = useState(false);
    const [videoId, setVideoId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchLiveVideoUrl();
    }, []);

    const fetchLiveVideoUrl = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/live-video-url`, {
                credentials: 'include' // ⭐ CRUCIAL: Enviar cookies/sessões
            });
            if (response.ok) {
                const data = await response.json();
                if (data.url) {
                    // Verificar se a URL é apenas # (indica "sem vídeo")
                    if (data.url.trim() === '#') {
                        setError('📺 Transmissão ao vivo temporariamente indisponível');
                        return;
                    }
                    
                    const extractedVideoId = extractVideoId(data.url);
                    if (extractedVideoId) {
                        setVideoId(extractedVideoId);
                        setShowVideo(true);
                    } else {
                        setError('URL do vídeo inválida');
                    }
                } else {
                    setError('📺 Nenhuma transmissão ao vivo configurada no momento');
                }
            } else {
                setError('Erro ao carregar vídeo ao vivo');
            }
        } catch (error) {
            console.error('Erro ao buscar URL do vídeo ao vivo:', error);
            setError('Erro de conexão com o servidor');
        } finally {
            setIsLoading(false);
        }
    };

    const extractVideoId = (url) => {
        if (!url) return '';
        
        // Regex para extrair ID do YouTube de diferentes formatos de URL
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        
        return (match && match[2].length === 11) ? match[2] : '';
    };

    useEffect(() => {
        if (showVideo) return;

        const timerId = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    clearInterval(timerId);
                    setShowVideo(true);
                    return 0;
                } else {
                    return prevCountdown - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [showVideo]);

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls: 1,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            fs: 0,
            showinfo: 0
        },
    };

    const hours = Math.floor(countdown / 3600);
    const minutes = Math.floor((countdown - (hours * 3600)) / 60);
    const seconds = countdown - (hours * 3600) - (minutes * 60);

    if (isLoading) {
        return (
            <div className="video-container">
                <h1 className="countdown" style={{ color: 'white' }}>
                    Carregando transmissão ao vivo...
                </h1>
            </div>
        );
    }

    if (error) {
        // Verificar se é uma mensagem amigável (com emoji) ou erro técnico
        const isTemporaryUnavailable = error.includes('📺');
        
        return (
            <div className="video-container">
                <h1 className="countdown" style={{ color: 'white' }}>
                    {error}
                </h1>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', marginTop: '20px' }}>
                    {isTemporaryUnavailable 
                        ? 'Fique ligado! A transmissão começará em breve. Atualize a página periodicamente.'
                        : 'Tente novamente mais tarde ou entre em contato com o suporte.'
                    }
                </p>
                {isTemporaryUnavailable && (
                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <button 
                            onClick={() => window.location.reload()} 
                            style={{
                                backgroundColor: '#e50914',
                                color: 'white',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: '500'
                            }}
                        >
                            🔄 Atualizar página
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="video-container">
            {showVideo && videoId ? (
                <YouTube videoId={videoId} opts={opts} className="video"/>
            ) : (
                <h1 className="countdown" style={{ color: 'white' }}>
                    A transmissão começará em breve...
                </h1>
            )}
        </div>
    );
}

export default LiveVideoPage;
