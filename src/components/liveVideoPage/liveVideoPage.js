import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import './liveVideoPage.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const LiveVideoPage = () => {
    const [countdown, setCountdown] = useState(7200);  // 2 hours in seconds
    const [showVideo, setShowVideo] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);  // New state for user authentication status

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

        // New effect for checking user authentication
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

        return () => clearInterval(timerId);  // clean up the interval on unmount
    }, []);

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

    return (
        <div className="video-container">
            {isAuthenticated ? (  // Check user authentication before showing video or countdown
                showVideo ? (
                    <YouTube videoId={videoId} opts={opts} className="video"/>
                ) : (
                    <h1 className="countdown" style={{ color: 'white' }}>
                        O culto iniciará em : {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </h1>
                )
            ) : (
                <h1>You need to login to view this content.</h1>
            )}
        </div>
    );
}

export default LiveVideoPage;
