import React from 'react';
import { useParams } from 'react-router-dom';

const VideoPlayerPage = () => {
  const { videoUrl } = useParams();
  const decodedVideoUrl = decodeURIComponent(videoUrl);

  return (
    <div className="video-container">
    <video width="1024" height="680" controls controlsList="nodownload" onContextMenu={(e) => e.preventDefault()} autoPlay muted onError={(e) => console.error('Video error:', e)}>
    <source src={decodedVideoUrl} type="video/mp4"/>
    Your browser does not support the video tag.
</video>

    </div>
  );
}

export default VideoPlayerPage;
