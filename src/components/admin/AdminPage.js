import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const [liveVideoUrl, setLiveVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' ou 'error'
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário é admin
    checkAdminAccess();
    // Buscar URL atual
    fetchCurrentUrl();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const token = localStorage.getItem('flowersEmail');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/verify-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ⭐ CRUCIAL: Enviar cookies/sessões
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        if (!data.isAdmin) {
          navigate('/welcome');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Erro ao verificar acesso admin:', error);
      navigate('/login');
    }
  };

  const fetchCurrentUrl = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/live-video-url`, {
        credentials: 'include' // ⭐ CRUCIAL: Enviar cookies/sessões
      });
      if (response.ok) {
        const data = await response.json();
        setLiveVideoUrl(data.url || '');
      }
    } catch (error) {
      console.error('Erro ao buscar URL atual:', error);
    }
  };

  const handleSave = async () => {
    if (!liveVideoUrl.trim()) {
      setMessage('Por favor, insira uma URL válida');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('flowersEmail');
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/update-live-video-url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ⭐ CRUCIAL: Enviar cookies/sessões
        body: JSON.stringify({ 
          token,
          url: liveVideoUrl 
        }),
      });

      if (response.ok) {
        setMessage('URL do vídeo ao vivo atualizada com sucesso!');
        setMessageType('success');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Erro ao atualizar URL');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Erro ao salvar URL:', error);
      setMessage('Erro ao conectar com o servidor');
      setMessageType('error');
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

  const getEmbedUrl = (url) => {
    const videoId = extractVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Painel de Administração</h1>
        <button 
          className={styles.backButton}
          onClick={() => navigate('/welcome')}
        >
          ← Voltar
        </button>
      </header>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2>Gerenciar Vídeo Ao Vivo</h2>
          <p className={styles.description}>
            Cole aqui o link do YouTube para o vídeo ao vivo. 
            Ele será exibido automaticamente na página "Ao Vivo".
          </p>

          <div className={styles.inputGroup}>
            <label htmlFor="liveUrl">URL do YouTube:</label>
            <input
              id="liveUrl"
              type="url"
              value={liveVideoUrl}
              onChange={(e) => setLiveVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className={styles.urlInput}
            />
          </div>

          {liveVideoUrl && (
            <div className={styles.preview}>
              <h3>Pré-visualização:</h3>
              <div className={styles.videoPreview}>
                {getEmbedUrl(liveVideoUrl) ? (
                  <iframe
                    src={getEmbedUrl(liveVideoUrl)}
                    title="Preview"
                    frameBorder="0"
                    allowFullScreen
                    className={styles.iframe}
                  />
                ) : (
                  <div className={styles.invalidUrl}>
                    URL inválida. Por favor, use um link válido do YouTube.
                  </div>
                )}
              </div>
            </div>
          )}

          {message && (
            <div className={`${styles.message} ${styles[messageType]}`}>
              {message}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={isLoading}
            className={styles.saveButton}
          >
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 