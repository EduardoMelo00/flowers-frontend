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
import yoomiEntrevista from './yoomiEntrevista.jpeg'
import vivianeEntrevista from './vivianeEntrevista.jpeg'
import prelizabethEntrevista from './prelizabethEntrevista.jpeg'
import cultotarde from './cultotarde.jpeg'
import cultomanha from './cultomanha.png'
import entrevistachantell from './entrevistachantell.png'
import entrevistapravictoria from './entrevistaPravictoria.png'
import entrevistaceres from './entrevistaceres.png'
import flowers2024dia01 from './flowers2024dia01.jpeg';
import entrevistaceres2024 from './entrevistaceres2024.jpg';
import entrevistacassiane from './entrevistacassiane.jpg';
import flowersdia02 from './flowersdia02.jpeg';
import entrevistasarah from './entrevistasarah.jpg';
import entrevistaviviane from './entrevistaviviane.jpg';
import flowerstarde from './flowerstarde.jpeg';
import thumbmanha from './thumbmanha.jpeg';
import sabadonoite from './sabadonoite.jpg';



    
import featured from './featured.mp4';

function WelcomePage() {
  const videoRowRef1 = useRef(null);
  const videoRowRef2 = useRef(null);
  const videoRowRef3 = useRef(null);
  const videoRowRef4 = useRef(null);
  const videoRowRef5 = useRef(null);
  const navigate = useNavigate();

  const [lastActive, setLastActive] = useState(Date.now());
  const [show2024Section, setShow2024Section] = useState(true);
  const [showDestaqueSection, setShowDestaqueSection] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [liveVideoUrl, setLiveVideoUrl] = useState('');
  const [hasValidLiveVideo, setHasValidLiveVideo] = useState(false);

  const videos = [
    // Entrevistas 2024
    {
      thumbnail: entrevistacassiane,
      videoUrl: 'https://flowersvideos.s3.amazonaws.com/Entrevista+-+Cassiane.mp4',
    },
    {
      thumbnail: entrevistaceres2024,
      videoUrl: 'https://flowersvideos.s3.amazonaws.com/Entrevista+-+Ceres.mp4',
    },
    {
      thumbnail: entrevistasarah,
      videoUrl: 'https://flowersvideos.s3.amazonaws.com/Entrevista+-+Sarah+Farias.mp4',
    },
    {
      thumbnail: entrevistaviviane,
      videoUrl: 'https://flowersvideos.s3.amazonaws.com/Entrevista+-+Viviane+Martinello.mp4',
    },
    // Entrevistas 2023
    {
      thumbnail: entrevistaMidian,
      videoUrl: 'https://bafybeiepeuqmlimfansjlyevg3k6qiiln7oyo3lfhqj36iy4gj7ch3jptu.ipfs.dweb.link/',
    },
    {
      thumbnail: vivianeEntrevista,
      videoUrl: 'https://bafybeihczozxdtkaxe2np2p6ykbwzgkwxlcgzmizyu6dju73m3i77izaki.ipfs.dweb.link/',
    },
    {
      thumbnail: prelizabethEntrevista,
      videoUrl: 'https://bafybeif6sh4yclk6rqlvlpbqbcdpiwx7ndqjluu3oxzqedbgm6akbpfpja.ipfs.dweb.link/',
    },
    {
      thumbnail: yoomiEntrevista,
      videoUrl: 'https://bafybeiamin6hnglbzdvmqehf6hp2pqcdimy4n2tpbrenlb27gt73saylrq.ipfs.dweb.link/',
    },
    {
      thumbnail: entrevistachantell,
      videoUrl: 'https://bafybeicz3pd5b6msib5i3ketrb5n2f633lzgyobxlayxugqpqcaowul36i.ipfs.dweb.link/',
    },
    {
      thumbnail: entrevistapravictoria,
      videoUrl: 'https://bafybeigfs3goi4wjqkz6ai4s352hnva4nr37okybjtkvowp2exl4fb5ium.ipfs.dweb.link/',
    },
    {
      thumbnail: entrevistaceres,
      videoUrl: 'https://bafybeieie36redp47sk67uqxp4j7k3acxqmnirqh7ey2olcm4omzzboq7u.ipfs.dweb.link/',
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
    const videosFlowers2023 = [
      {
        thumbnail: flowersdia1,
        videoUrl:
          'https://bafybeicxq6qqa2vac2gyyrzaozo2dxbc6ozqiltrdyc6ac62ske2lc3gi4.ipfs.dweb.link/',
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
      },
      {
        thumbnail: cultomanha,
        videoUrl:
          'https://bafybeicymac36j3hfsewcc7ornqmmccf5cc4jmcnu4mz2j45ngmf5amwzm.ipfs.dweb.link/',
      },
      {
        thumbnail: cultotarde,
        videoUrl:
          'https://bafybeieuxxjk5zgkjajkqs6vi4ysvkgn55oguhkdakj7sirr3opm3fulhu.ipfs.dweb.link/',
      },
    ]

  const videosFlowers2024 = [
    {
      thumbnail: flowers2024dia01,
      videoUrl:
        'https://flowersvideos.s3.amazonaws.com/FLOWERS+2024+-+CASSIANE+-+CERES+SILVA+-+DIA+01.mp4',
    },
    {
      thumbnail: flowersdia02,
      videoUrl:
        'https://flowersvideos.s3.amazonaws.com/MultiCorder1+-+BLACKMAGIC+-+28+junho+2024+-+07-07-30+.mp4',
    },
    {
      thumbnail: thumbmanha,
      videoUrl:
        'https://flowersvideos.s3.amazonaws.com/sabadomanha.mp4',
    },
    {
      thumbnail: flowerstarde,
      videoUrl:
        'https://flowersvideos.s3.amazonaws.com/MultiCorder1+-+BLACKMAGIC+-+29+junho+2024+-+02-09-51+.mp4',
    },
    {
      thumbnail: sabadonoite,
      videoUrl:
        'https://flowersvideos.s3.amazonaws.com/FLOWERS+2024+-+NOITE+-+DIA+03.mp4',
    },
  ];

  const videosDestaque = [
    // Exemplo de vídeo de destaque (adicione ou remova conforme necessário)
    // {
    //   thumbnail: flowers2024dia01,
    //   videoUrl: 'https://flowersvideos.s3.amazonaws.com/FLOWERS+2024+-+CASSIANE+-+CERES+SILVA+-+DIA+01.mp4',
    // },
  ];

  useEffect(() => {
    // Existing code...
  
    // Update lastActive whenever user interacts with the page
    const handleActivity = () => setLastActive(Date.now());
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);

    // Fechar menu do usuário ao clicar fora
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles['user-area']}`)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
  
    // Detecta scroll para mobile header
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [navigate]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('flowersEmail');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/verify-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // ⭐ CRUCIAL: Enviar cookies/sessões
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          const data = await response.json();
          setUserEmail(data.email);
          setIsAdmin(data.isAdmin || false); // Verifica se é admin
        } else {
          localStorage.removeItem('flowersEmail');
          navigate('/login');
        }
      } catch (error) {
        console.error('Erro ao verificar token:', error);
        localStorage.removeItem('flowersEmail');
        navigate('/login');
      }
    };

    // Função para buscar o link do vídeo ao vivo
    const fetchLiveVideoUrl = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/live-video-url`, {
          credentials: 'include' // ⭐ CRUCIAL: Enviar cookies/sessões
        });
        if (response.ok) {
          const data = await response.json();
          const url = data.url || '';
          setLiveVideoUrl(url);
          setHasValidLiveVideo(isValidVideoUrl(url)); // ⭐ Verificar se a URL é válida
        }
      } catch (error) {
        console.error('Erro ao buscar URL do vídeo ao vivo:', error);
        setHasValidLiveVideo(false);
      }
    };

    checkToken();
    fetchLiveVideoUrl();
  }, [navigate]);

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ top: 0, left: -300, behavior: 'smooth' });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ top: 0, left: 300, behavior: 'smooth' });
  };
  
  // Função para obter a inicial do email
  const getEmailInitial = (email) => {
    return email ? email.charAt(0).toUpperCase() : 'U';
  };

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem('flowersEmail');
    navigate('/login');
  };

  // Função para verificar se a URL do vídeo é válida
  const isValidVideoUrl = (url) => {
    if (!url || url.trim() === '' || url.trim() === '#') {
      return false;
    }
    
    // Verificar se é uma URL do YouTube válida
    const youtubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(youtubeRegex);
    return match && match[2] && match[2].length === 11;
  };

  // Função para toggle do menu do usuário
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <div >
      <nav className={`${styles['top-nav']} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles['logo-container']}>
          <img src={logo} className={styles.logo} alt="Logo" />
        </div>
        <ul className={styles['nav-links']}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="/live">
              Ao vivo
              {hasValidLiveVideo && (
                <span className={styles.liveIndicatorGlow}>
                  🔴
                </span>
              )}
            </a>
          </li>
          <li>
            <a href="https://wa.me/48984863659" target="_blank" rel="noopener noreferrer">Fale Conosco</a>
          </li>
        </ul>
        <div className={styles['user-area']}>
          <div className={styles['user-avatar']} onClick={toggleUserMenu}>
            {getEmailInitial(userEmail)}
          </div>
          {showUserMenu && (
            <div className={styles['user-menu']}>
              <div className={styles['user-menu-item']}>
                <strong>Email:</strong> {userEmail}
              </div>
              {isAdmin && (
                <div className={styles['user-menu-item']} onClick={() => navigate('/admin')}>
                  Administração
                </div>
              )}
              <div className={styles['user-menu-item']} onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
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
        <h2>Top 10</h2>
        <div className={styles['video-row']} ref={videoRowRef1}>
          {videos.map((video, index) => (
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

      {show2024Section && (
        <div className={styles['gallery-container']}>
          <h2>2024</h2>
          <div className={styles['video-row']} ref={videoRowRef4}>
            {videosFlowers2024.map((video, index) => (
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
      )}

      <div className={styles['gallery-container']}>
        <h2>Flowers 2023</h2>
        <div className={styles['video-row']} ref={videoRowRef2}>
          {videosFlowers2023.map((video, index) => (
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
        <h2>Flowers 2022</h2>
        <div className={styles['video-row']} ref={videoRowRef5}>
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
          onClick={() => scrollLeft(videoRowRef5)}
        >
          &lt;
        </div>
        <div
          className={styles.arrow + ' ' + styles['arrow-right']}
          onClick={() => scrollRight(videoRowRef5)}
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

      {showDestaqueSection && videosDestaque.length > 0 && (
        <div className={styles['gallery-container']}>
          <h2>Destaques</h2>
          <div className={styles['video-row']}>
            {videosDestaque.map((video, index) => (
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
        </div>
      )}
    </div>
  );
}

export default WelcomePage;
