import React from 'react';
import { useParams } from 'react-router-dom';
import styles from  './videoPage.css'


const VideoPlayerPage = () => {
  const { id } = useParams();
  const decodedVideoUrl = decodeURIComponent(id);

  // Função para converter URL do Google Drive para embed
  const getGoogleDriveEmbedUrl = (url) => {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return null;
  };

  // Verificar se é uma URL do Google Drive
  const isGoogleDriveUrl = decodedVideoUrl.includes('drive.google.com');
  const googleDriveEmbedUrl = isGoogleDriveUrl ? getGoogleDriveEmbedUrl(decodedVideoUrl) : null;

  return (
    <div className="video-live">
      {isGoogleDriveUrl && googleDriveEmbedUrl ? (
        <iframe
          src={googleDriveEmbedUrl}
          width="1024"
          height="680"
          allow="autoplay"
          allowFullScreen
          frameBorder="0"
          style={{ backgroundColor: 'black' }}
        />
      ) : (
        <video 
          width="1024" 
          height="680" 
          controls 
          controlsList="nodownload" 
          onContextMenu={(e) => e.preventDefault()} 
          autoPlay 
          muted 
          onError={(e) => console.error('Video error:', e)}
        >
          <source src={decodedVideoUrl} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

export default VideoPlayerPage;
