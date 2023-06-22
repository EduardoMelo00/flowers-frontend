import React from 'react';
import { useParams } from 'react-router-dom';

function YoutubePage() {
  let { videoUrl } = useParams();
  videoUrl = decodeURIComponent(videoUrl);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoUrl}`}
        title="Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        allowFullScreen
        style={{ height: '100%', width: '100%' }}
      ></iframe>
    </div>
  );
}

export default YoutubePage;
