import React, { useEffect } from 'react';
import YouTube from 'react-youtube';
import './liveVideoPage.css';

const LiveVideoPage = () => {
    const opts = {
      height: '100%',  
      width: '100%',   
      playerVars: {
        autoplay: 1,
        controls: 0,  
        disablekb: 1,  
        modestbranding: 1,  
        rel: 0, 
        fs: 0,  
        showinfo: 0  
      },
    };
  
    const videoId = "Ttyn2vNc3is"; 
  
    return (
      <div className="video-container">
        <YouTube videoId={videoId} opts={opts} className="video"/>
      </div>
    );
  }
  

export default LiveVideoPage;

