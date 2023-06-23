import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import './liveVideoPage.css';



const LiveVideoPage = () => {
    const [countdown, setCountdown] = useState(5);  // 2 hours in seconds
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
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
        }, 1000);  // countdown every 1000ms (or 1s)
        return () => clearInterval(timerId);  // clean up the interval on unmount
    }, []);

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

    const videoId = "1pGbxLjp9OQ";

    const hours = Math.floor(countdown / 3600);
    const minutes = Math.floor((countdown - (hours * 3600)) / 60);
    const seconds = countdown - (hours * 3600) - (minutes * 60);

    return (
        <div className="video-container">
 
                {/* <YouTube videoId={videoId} opts={opts} className="video"/>
       */}
                <h1 className="countdown" style={{ color: 'white' }}>
                    A transmissão acabou, em breve o culto estará disponível nos destaques.
                </h1>
            
        </div>
    );
}

export default LiveVideoPage;
