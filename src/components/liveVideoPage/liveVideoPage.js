import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import './liveVideoPage.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const LiveVideoPage = () => {
  const [countdown, setCountdown] = useState(7200);  // 2 hours in seconds
  const [showVideo, setShowVideo] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const token = Cookies.get('token'); // get token from cookies
        const response = await axios.get('https://flowers-node-backend-2c4af429ac26.herokuapp.com/api/auth/checkToken', {
          headers: {
            'Authorization': `Bearer ${token}` // Send token in Authorization header
          }
        });
        setIsAuthenticated(response.status === 200);
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
    };

    checkUserAuthentication();

    // Set an interval to trigger a re-render every 5 seconds
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 5000);

    return () => {
      clearInterval(interval);
    }
  }, [time]);  // Add 'time' as a dependency

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

  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown - (hours * 3600)) / 60);
  const seconds = countdown - (hours * 3600) - (minutes * 60);

  return isAuthenticated ? (
    <div className="video-container">
      {showVideo ? (
        <YouTube videoId={videoId} opts={opts} className="video"/>
      ) : (
        <h1 className="countdown" style={{ color: 'white' }}>
          O culto iniciará em : {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
    </div>
  ) : (
    <div>You need to login to view this content.</div>
  );
}

export default LiveVideoPage;
