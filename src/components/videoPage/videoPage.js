import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import './videoPage.css'

const VideoPage = () => {
  const { id } = useParams(); // Use the useParams hook to get route params

  return (
    <div className="video-container">
      <iframe 
        width="560" 
        height="315" 
        src={`https://www.youtube.com/embed/${id}`}
        title="3 CHAVES PARA VIVER O SOBRENATURAL DE DEUS - Pra Victória Batista - Mais de Cristo" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default VideoPage;
