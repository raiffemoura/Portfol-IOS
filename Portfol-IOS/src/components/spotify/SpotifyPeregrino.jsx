import React , { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import iconConfig from '../iconConfig';
import { useTranslation } from 'react-i18next'

const SpotifyPeregrino = () => {
    // State
            const [isPlaying, setIsPlaying] = useState(false);
            const [isShuffle, setIsShuffle] = useState(true);
            const [isPreviusMouseOver, setIsPreviusMouseOver] = useState(false);
            const [isNextMouseOver, setIsNextMouseOver] = useState(false);
            const [isHidden, setIsHidden] = useState(false);
            const [duration, setDuration] = useState(0);
            const [currentTime, setCurrentTime] = useState(0);
            const [isFollowing, setIsFollowing] = useState(false);
            const [isFollowing2, setIsFollowing2] = useState(false);
            const { t } = useTranslation();



    // references
    const audioPlayer = useRef(); // reference our audio component
    const progressBar = useRef(); // reference our progress bar
    const animationRef = useRef(); // reference the animation



    useEffect(() => {
        if (audioPlayer.current) {
            const seconds = Math.floor(audioPlayer.current.duration);
            setDuration(seconds);
            progressBar.current.max = seconds;
        }
    }, [audioPlayer?.current?.loadedMetaData, audioPlayer?.current?.readyState]);



    



    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);

        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const togglePlayPause = () => {
       const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }
    const stop = () => {
        setIsPlaying(false);
        audioPlayer.current.pause();
        cancelAnimationFrame(animationRef.current);

    }


    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
       changePlayerCurrentTime();
       animationRef.current = requestAnimationFrame(whilePlaying);


    } 
        
    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
       changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty("--seek-before-width", `${(progressBar.current.value / duration) * 100}%`);
        setCurrentTime(progressBar.current.value);
    }

  
   

 



    return (  
        <div className='spotify-page'>
            <div className='header-spotify'>
                <Link to={"/"} ><img className='spotify-header-img' src={iconConfig.arrow} alt="arrow" /></Link>
                <p className='spotify-header-text'>{t("likedSongs")}</p>
                <img className='spotify-header-img' src={iconConfig.dots} alt="more" />
            </div>
            <div className='album'><img src={iconConfig.albumPeregrino} alt="album" /></div>
            <div>
                <div className='title'>
                    <div>
                        <h3>Peregrino</h3>
                        <p>Alessandro Vilas Boas</p>
                    </div>
                    <div><img className='liked' src={iconConfig.liked}  alt="liked" /></div>

                </div>
                <div className='player'>
                <div className='audio-container'>
                    <audio ref={audioPlayer} >
                        <source src={iconConfig.peregrino} type="audio/mp3" />
                        <source src={iconConfig.peregrinoOGG} type="audio/ogg" />
                            
                        Your browser does not support the audio element.

                    </audio>
                        {/* progress bar */}
                    <input className="progressBar" type="range" defaultValue="0" ref={progressBar} onChange={changeRange}/>
                      
                    <div className='audio-progress-container' >
                         {/* Current time  */}
                        <div className='audio-progress'>{calculateTime(currentTime)}</div>
                        {/* Duration  */}
                        <div className='audio-duration'>{(duration && !isNaN(duration)) ? calculateTime(duration) : '0:00'}</div>

                    </div>

                    


                    <div className='audio-buttons'>
                        <button onClick={() => setIsShuffle(!isShuffle)}>{isShuffle ? <img className='shuffle-list' src={iconConfig.shuffle} alt="shuffle-list"  /> : <img className='shuffle-list' src={iconConfig.list} alt="shuffle"  />}</button>
                        <button
                            onMouseOver={() => setIsPreviusMouseOver(true)}
                            onMouseOut={() => setIsPreviusMouseOver(false)}>
                            {isPreviusMouseOver ? (
                            <Link to={"/spotify/uma-coisa"}><img onClick={stop} className='previus' src={iconConfig.previusWhite} alt="previusWhite" /></Link>
                            ) : (
                            <img className='previus' src={iconConfig.previus} alt="previus" />
                            )}
                        </button>
                        <button onClick={togglePlayPause}>{isPlaying ? <img className='play-pause' src={iconConfig.pause} alt="play-pause"  /> : <img className='play-pause' src={iconConfig.play} alt="play-pause"  /> }</button>
                        <button
                            onMouseOver={() => setIsNextMouseOver(true)}
                            onMouseOut={() => setIsNextMouseOver(false)}>
                            {isNextMouseOver ? (
                            <Link to={"/spotify/uma-coisa"}><img onClick={stop} className='next' src={iconConfig.nextWhite} alt="nextWhite" /></Link>
                            ) : (
                             <img className='next' src={iconConfig.next} alt="next" />
                            )}
                        </button>
                        <button onMouseOver={() => setIsHidden(true)} onMouseOut={() => setIsHidden(false)}>
                            {isHidden ? (  <img className='spotify-hidden' src={iconConfig.hiddenRed} alt="hiddenRed" />
                            ) : (
                            <img className='spotify-hidden' src={iconConfig.hidden} alt="hidden" />
                            )}
                        </button>
                    </div>

                </div>
                </div>
                <div className='bottom-buttons'>
                    <button className='bottom-buttons-left'>
                        <img src={iconConfig.devices} alt="devices" />
                    </button>
                   
                    <button className='bottom-buttons-right'>
                        <img src={iconConfig.share} alt="share" />
                    </button>

                </div>
                <div className='about-artist-card'>
                    <div className='about-artist-title'>
                        <h5 className='artist-title'>{t("aboutArtist")}</h5>
                    </div>
                    <div className='artist-info'>
                        <div>
                            <h4>Alessandro Vilas Boas</h4>
                            <p>1.2M {t("montlyListeners")}</p>
                            
                               
                        </div>
                        <button className='follow-button' onClick={() => setIsFollowing(!isFollowing)}>{isFollowing ? t("following") : t('follow')}</button>
                    </div>
                    <div className='artist-description'>

                        <span >
                        Sua história começa no favor de Deus. Alessandro é um improvável, e como ama dizer "alguém comum". 
                        Nascido dia 30 de Julho de 1993 em Itajubá -MG  </span> <Link to='/spotify/alessandro-vilas-boas'><button  className='see-more'>...{t("seeMore")}</button></Link>
                        
                    </div>
                    
                </div>
                <div className='about-artist-card'>
                        <div className='card-credit-title'>
                            <h4>{t("credits")}</h4>
                        </div>
                        <div className='card-credit'>
                            <div className='card-credit-text'>
                                <h5>Alessandro Vilas Boas</h5>
                                <p className='credit-text'>{t("mainArtist")}, {t("composer")}</p>
                            </div>
                            <button className='follow-button' onClick={() => setIsFollowing(!isFollowing)}>{isFollowing ?  t("following") : t('follow')}</button>
                        </div>
                        <div className='card-credit'>
                            <div className='card-credit-text'>
                                <h5>One Sounds</h5>
                                <p className='credit-text'>{t("mainArtist")}</p>
                            </div>
                            <button className='follow-button' onClick={() => setIsFollowing2(!isFollowing2)}>{isFollowing2 ?  t("following") : t('follow')}</button>
                        </div>
                    
                </div>
            </div>                    
            
        </div>

    );
}
 
export default SpotifyPeregrino;