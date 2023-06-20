import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './welcomePage.module.css';
import logo from './logo.png'
import thumbnail1 from './thumbnail1.jpg'
import thumbnail2 from './thumbnail2.jpg'
import thumbnail3 from './thumbnail3.jpg'
import featured from './featured.mp4'
import jwt_decode from "jwt-decode";

function WelcomePage() {
    const videoRowRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
      const checkToken = async () => {
        try {
          const response = await fetch('https://flowers-node-backend-2c4af429ac26.herokuapp.com/api/auth/check-token', {
            method: 'GET',
            credentials: 'include', // include, *same-origin, omit
          });
      
          if (response.ok) {
            // Token is valid, user is authenticated
            console.log('User is authenticated');
          } else if (response.status === 401) {
            // Token is missing or expired, user is not authenticated
            console.log('User is not authenticated');
            navigate('/login');
          } else {
            // Other error status, handle it accordingly
            console.log('Error:', response.statusText);
            // Handle the error case, such as displaying an error message
          }
        } catch (error) {
          console.error('Error:', error.message);
          // Handle the error case, such as displaying an error message
        }
      };
    
      checkToken();
    }, [navigate]);
    

    const scrollLeft = () => {
        videoRowRef.current.scrollBy({ top: 0, left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        videoRowRef.current.scrollBy({ top: 0, left: 300, behavior: 'smooth' });
    };

    return (
        <div> 
            <nav className={styles["top-nav"]}>
                <div className={styles["logo-container"]}>
                    <img src={logo} className={styles.logo} alt="Logo" />
                </div>
                <ul className={styles["nav-links"]}>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Ao vivo</a></li>
                    <li><a href="#">Biblioteca</a></li>
                </ul>
            </nav>
            <div className={styles["featured-video"]}>
                <video src={featured} autoPlay muted loop className={styles["video-player"]}></video>
            </div>
            <div className={styles["gallery-container"]}>
                <h2>Flowers Conference</h2>
                <div className={styles["video-row"]} ref={videoRowRef}>
                    <a href="player.html?videoId=X6Wa9Hp_TwM">
                        <img src={thumbnail1} alt="Video Thumbnail" className={styles["video-thumbnail"]} />
                    </a>
                    <img src={thumbnail2} alt="Video Thumbnail" className={styles["video-thumbnail"]} />
                    <img src={thumbnail3} alt="Video Thumbnail" className={styles["video-thumbnail"]} />
                    <img src={thumbnail1} alt="Video Thumbnail" className={styles["video-thumbnail"]} />
                </div>
                <div className={styles.arrow + " " + styles["arrow-left"]} onClick={scrollLeft}>&lt;</div>
                <div className={styles.arrow + " " + styles["arrow-right"]} onClick={scrollRight}>&gt;</div>
            </div>
        </div>
    );
}



export default WelcomePage;
