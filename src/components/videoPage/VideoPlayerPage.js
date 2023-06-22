import React from 'react';
import { useParams } from 'react-router-dom';
import styles from  './videoPage.css'


const VideoPlayerPage = () => {
  const { id } = useParams();
  const decodedVideoUrl = decodeURIComponent(id);

  return (

    
    <div className="video-live">
    <video width="1024" height="680" controls controlsList="nodownload" onContextMenu={(e) => e.preventDefault()} autoPlay muted onError={(e) => console.error('Video error:', e)}>
    <source src={decodedVideoUrl} type="video/mp4"/>
    Your browser does not support the video tag.
</video>

    </div>
  );
}

export default VideoPlayerPage;
