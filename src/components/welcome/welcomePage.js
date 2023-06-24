import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './welcomePage.module.css';
import flowersdia1 from './flowersdia1.jpeg';
import logo from './logo.png';
import thumbnail1 from './thumbnail1.jpg';
import thumbnail2 from './thumbnail2.jpg';
import thumbnail3 from './thumbnail3.jpg';
import iracet from './iracet.jpeg';
import gabi from './gabi.jpeg';
import priscila from './priscila.jpeg';
import marisa from './marisa.jpeg';
import lia from './lia.jpeg';
import ceres from './ceres.jpeg'
import flowersConference from './flowers2021.jpeg'
import flowers2022 from './flowers2022.jpeg'
import entrevistaMidian from './entrevistaMidian.jpeg'
import viviane23 from './viviane23.jpeg'
import gabi23 from './gabi23.jpeg'


    
import featured from './featured.mp4';

function WelcomePage() {
  const videoRowRef1 = useRef(null);
  const videoRowRef2 = useRef(null);
  const videoRowRef3 = useRef(null);
  const videoRowRef4 = useRef(null);
  const navigate = useNavigate();

  const [lastActive, setLastActive] = useState(Date.now());

  const videos = [
 
    {
      thumbnail: iracet,
      videoUrl:
        'VZ1jdPLHhl0',
    },
    {
      thumbnail: gabi,
      videoUrl:
        'FC78HqYp_6c',
    },
    {
      thumbnail: thumbnail1,
      videoUrl:
        '5mviVdQPi9w',
    },
    {
      thumbnail: thumbnail2,
      videoUrl:
        'X6Wa9Hp_TwM',
    },
    {
      thumbnail: priscila,
      videoUrl:
        'fHMyqLT2H5o',
    },
    {
      thumbnail: thumbnail3,
      videoUrl:
        'jZ-lZEG50lw',
    },
    {
      thumbnail: marisa,
      videoUrl:
        'OKhTOkPtt_o',
    },
    {
      thumbnail: lia,
      videoUrl:
        'mzDPSR-la-c',
    },
    {
      thumbnail: ceres,
      videoUrl:
        'Ju5pkT34z9A',
    },
  ];

  const videosFlowers2021 = [
    {
      thumbnail: flowersConference,
      videoUrl:
        'https://bafybeietxiu4otaipbeayiabcadlvmquwgqehbxhwjyswwgbt54vjajvke.ipfs.dweb.link/',
    },
    {
      thumbnail: flowersConference,
      videoUrl:
        'https://bafybeia5lic77pvkrf555qwrffcnhnl3end4nrbzglnsla4bayvkkyuq7q.ipfs.dweb.link/',
    },
    {
      thumbnail: flowersConference,
      videoUrl:
        'https://bafybeigufj2og2dpp5eftnqoe6dlu2zx64eg2vmmfxsu7bjth5fx4jo7yi.ipfs.dweb.link/',
    },
    {
      thumbnail: flowersConference,
      videoUrl:
        'https://bafybeignecsybvrslrarfm7kolxyhcr2beqn5rvb6a5m3y26oclgwfsvsy.ipfs.dweb.link/',
    },
    {
      thumbnail: flowersConference,
      videoUrl:
        'https://bafybeicpxkrn6s7h5n2mvyjxm7pmwbrzitugxmmeopelqc6jyaik5bwv4m.ipfs.dweb.link/',
    },
    {
      thumbnail: flowersConference,
      videoUrl:
        'https://bafybeiaozwee7ssizcuvy6a7gnuhexpoi2fbp6mww6jxc2ia6kg4xmccee.ipfs.dweb.link/',
    },
    
  ];

  const videosFlowers2022 = [
    {
      thumbnail: flowers2022,
      videoUrl:
        'https://bafybeia6b6m3gughnvhtwrhgzvysi5ntozwqy2pkoqcxce6qwb5f4x3g44.ipfs.dweb.link/',
    },
    {
      thumbnail: flowers2022,
      videoUrl:
        'https://bafybeicivos6tzbvadoj25uwm7psfyajdawcd25deybqiu2nskllwx5dfa.ipfs.dweb.link/',
    },
    {
      thumbnail: flowers2022,
      videoUrl:
        'https://bafybeicr7qzxoiftqpdy3zc2gnrm2pjigmltv2by3ppiueadycojbyhsye.ipfs.dweb.link/',
    },
    {
      thumbnail: flowers2022,
      videoUrl:
        'https://bafybeihelfvl3wkv24itd355vpbfan3sdrxrkcopi3t4xuf2wtjnqritdu.ipfs.dweb.link/',
    },
    {
      thumbnail: flowers2022,
      videoUrl:
        'https://bafybeibnpid64ahnunq6uvvd7itbqfuwygoipnra5olmq2pzm5ed7fhzse.ipfs.dweb.link/',
    },
  ]
    const destaques = [
      {
        thumbnail: flowersdia1,
        videoUrl:
          'https://bafybeicxq6qqa2vac2gyyrzaozo2dxbc6ozqiltrdyc6ac62ske2lc3gi4.ipfs.dweb.link/',
      },
      {
        thumbnail: entrevistaMidian,
        videoUrl:
          'https://bafybeiepeuqmlimfansjlyevg3k6qiiln7oyo3lfhqj36iy4gj7ch3jptu.ipfs.dweb.link/',
      },
      {
        thumbnail: viviane23,
        videoUrl:
          'https://bafybeif326fjiibt242x66whwogipvtc7b2x6jphigxjgtghmpaqxoztti.ipfs.dweb.link/',
      },
      {
        thumbnail: gabi23,
        videoUrl:
          'https://bafybeif2vehfeooxtk2ishrwosfcw2tjfxaosl67ypeyt5excx7evfge6i.ipfs.dweb.link/',
      } 
      
      
      //https://nftstorage.link/ipfs/bafybeif2vehfeooxtk2ishrwosfcw2tjfxaosl67ypeyt5excx7evfge6i
      
      // https://nftstorage.link/ipfs/bafybeif326fjiibt242x66whwogipvtc7b2x6jphigxjgtghmpaqxoztti

  ];

  useEffect(() => {
    // Existing code...
  
    // Update lastActive whenever user interacts with the page
    const handleActivity = () => setLastActive(Date.now());
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
  
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, [navigate]); 

  useEffect(() => {

    const checkToken = async () => {
      try {

        const emailStorage = localStorage.getItem('flowersEmail');


        if (Date.now() - lastActive > 4 * 60 * 60 * 1000) {
          navigate('/login');
        }

        if (emailStorage) {
          // Token is present, user is authenticated
          console.log('User is authenticated');
        } else {
            
          console.log('User is not authenticated');
          navigate('/login')
        }
      } catch (error) {
        console.error('Error:', error.message);
        // Handle the error case, such as displaying an error message
      }
    };

    checkToken();
  }, [navigate]);

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ top: 0, left: -300, behavior: 'smooth' });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ top: 0, left: 300, behavior: 'smooth' });
  };
  
  return (
    <div >
      <nav className={styles['top-nav']}>
        <div className={styles['logo-container']}>
          <img src={logo} className={styles.logo} alt="Logo" />
        </div>
        <ul className={styles['nav-links']}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="/live">Ao vivo</a>
          </li>
        </ul>
      </nav>
      <div className={styles['featured-video']}>
        <video
          src={featured}
          autoPlay
          muted
          loop
          className={styles['video-player']}
        ></video>
      </div>


      <div className={styles['gallery-container']}>
        <h2>Destaques</h2>
        <div className={styles['video-row']} ref={videoRowRef4}>
          {destaques.map((video, index) => (
            <a
              key={index}
              href={`/video/${encodeURIComponent(video.videoUrl)}`}
            >
              <img
                src={video.thumbnail}
                alt="Video Thumbnail"
                className={styles['video-thumbnail']}
              />
            </a>
          ))}
        </div>
        <div
          className={styles.arrow + ' ' + styles['arrow-left']}
          onClick={() => scrollLeft(videoRowRef4)}
        >
          &lt;
        </div>
        <div
          className={styles.arrow + ' ' + styles['arrow-right']}
          onClick={() => scrollRight(videoRowRef4)}
        >
          &gt;
        </div>
      </div> 


      <div className={styles['gallery-container']}>
  <h2>Top 10</h2>
  <div className={styles['video-row']} ref={videoRowRef1}>
    {videos.map((video, index) => (
      <a
        key={index}
        href={`/youtube/${encodeURIComponent(video.videoUrl)}`}
      >
        <img
          src={video.thumbnail}
          alt="Video Thumbnail"
          className={styles['video-thumbnail']}
        />
      </a>
    ))}
  </div>
  <div
    className={styles.arrow + ' ' + styles['arrow-left']}
    onClick={() => scrollLeft(videoRowRef1)}
  >
    &lt;
  </div>
  <div
    className={styles.arrow + ' ' + styles['arrow-right']}
    onClick={() => scrollRight(videoRowRef1)}
  >
    &gt;
  </div>
</div>

      <div className={styles['gallery-container']}>
        <h2>Flowers 2022</h2>
        <div className={styles['video-row']} ref={videoRowRef2}>
          {videosFlowers2022.map((video, index) => (
            <a
              key={index}
              href={`/video/${encodeURIComponent(video.videoUrl)}`}
            >
              <img
                src={video.thumbnail}
                alt="Video Thumbnail"
                className={styles['video-thumbnail']}
              />
            </a>
          ))}
        </div>
        <div
          className={styles.arrow + ' ' + styles['arrow-left']}
          onClick={() => scrollLeft(videoRowRef2)}
        >
          &lt;
        </div>
        <div
          className={styles.arrow + ' ' + styles['arrow-right']}
          onClick={() => scrollRight(videoRowRef2)}
        >
          &gt;
        </div>

      </div>

      <div className={styles['gallery-container']}>
        <h2>Flowers 2021</h2>
        <div className={styles['video-row']} ref={videoRowRef3}>
          {videosFlowers2021.map((video, index) => (
            <a
              key={index}
              href={`/video/${encodeURIComponent(video.videoUrl)}`}
            >
              <img
                src={video.thumbnail}
                alt="Video Thumbnail"
                className={styles['video-thumbnail']}
              />
            </a>
          ))}
        </div>
        <div
          className={styles.arrow + ' ' + styles['arrow-left']}
          onClick={() => scrollLeft(videoRowRef3)}
        >
          &lt;
        </div>
        <div
          className={styles.arrow + ' ' + styles['arrow-right']}
          onClick={() => scrollRight(videoRowRef3)}
        >
          &gt;
        </div>
      </div>    
    </div>
  );
}

export default WelcomePage;
