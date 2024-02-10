import React , { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import iconConfig from '../iconConfig';
import "../../styles/spotify-uma-coisa.css"

const SpotifyPage = () => {
    // State
            const [isPlaying, setIsPlaying] = useState(false);
            const [isShuffle, setIsShuffle] = useState(true);
            const [isPreviusMouseOver, setIsPreviusMouseOver] = useState(false);
            const [isNextMouseOver, setIsNextMouseOver] = useState(false);
            const [isHidden, setIsHidden] = useState(false);
            const [duration, setDuration] = useState(0);
            const [currentTime, setCurrentTime] = useState(0);
            const [isFollowing, setIsFollowing] = useState(false);


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
        <div className='spotify-page-uma-coisa '>
            <div className='header-spotify'>
                <Link to={"/"} ><img className='spotify-header-img' src={iconConfig.arrow} alt="arrow" /></Link>
                <p className='spotify-header-text'>Liked Songs</p>
                <img className='spotify-header-img' src={iconConfig.dots} alt="more" />
            </div>
            <div className='album'><img src={iconConfig.albumUmaCoisa} alt="album" /></div>
            <div>
                <div className='title'>
                    <div>
                        <h3>Uma Coisa - Ao Vivo</h3>
                        <p>MORADA</p>
                    </div>
                    <div><img className='liked' src={iconConfig.liked}  alt="liked" /></div>

                </div>
                <div className='player'>
                <div className='audio-container'>
                    <audio ref={audioPlayer} >
                        <source src={iconConfig.umacoisa} type="audio/mp3" />
                        <source src={iconConfig.umacoisaOGG} type="audio/ogg" />
                            
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
                            <Link to={"/spotify/Peregrino"}><img onClick={iconConfig.stop} className='previus' src={iconConfig.previusWhite} alt="previusWhite" /></Link>
                            ) : (
                            <img className='previus' src={iconConfig.previus} alt="previus" />
                            )}
                        </button>
                        <button onClick={togglePlayPause}>{isPlaying ? <img className='play-pause' src={iconConfig.pause} alt="play-pause"  /> : <img className='play-pause' src={iconConfig.play} alt="play-pause"  /> }</button>
                        <button
                            onMouseOver={() => setIsNextMouseOver(true)}
                            onMouseOut={() => setIsNextMouseOver(false)}>
                            {isNextMouseOver ? (
                            <Link to={"/spotify/Peregrino"}><img onClick={stop} className='next' src={iconConfig.nextWhite} alt="nextWhite" /></Link>
                            ) : (
                            <img className='next' src={iconConfig.next} alt="next" />
                            )}
                        </button>
                        <button onMouseOver={() => setIsHidden(true)} onMouseOut={() => setIsHidden(false)}>
                            {isHidden ? (  <img className='hidden' src={iconConfig.hiddenRed} alt="hiddenRed" />
                            ) : (
                            <img className='hidden' src={iconConfig.hidden} alt="hidden" />
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
                <div className='lycris-uma-coisa'>
                        <h5 className='artist-title'>Lycris</h5>
                        <div className='lycris'>
                            <div>
                                <p>Uma coisa vou pedir</p>
                                <p>Deixa eu ficar neste lugar</p>
                                <p>Todos os dias da minha vida</p>
                                Uma coisa vou pedir
                                <p>Deixa eu ficar neste lugar</p>
                                <p>Todos os dias da minha vida</p>
                            </div>
                            <div>
                                <p>Uma coisa vou pedir</p>
                                <p>Deixa eu ficar neste lugar</p>
                                <p>Todos os dias da minha vida</p>
                                <p>Uma coisa vou pedir</p> (é só uma coisa)
                                <p>Deixa eu ficar neste lugar</p>
                                <p>Todos os dias da minha vida</p> 
                                <p>(na Tua presença, na Tua Presença)</p>
                            </div>
                            <div>
                                <p>E uma coisa vou pedir</p>
                                <p>Deixa eu ficar neste lugar</p>
                                <p>Todos os dias da minha vida</p>
                                <p>Uma coisa vou pedir</p>
                                <p>Deixa eu ficar neste lugar</p>
                                <p>Todos os dias da minha vida</p>
                            </div>
                            <div>
                                <p>Nós adoramos Aquele que faz</p>
                                <p>Vento aos Teus anjos</p>
                                <p>Nós adoramos Aquele que faz</p>
                                <p>Fogo aos Teus ministros</p>
                            </div>
                            <div>
                                <p>Nós adoramos Aquele que faz</p>
                                <p>Vento aos Teus anjos</p>
                                <p>Nós adoramos Aquele que faz</p>
                                <p>Fogo aos Teus ministros</p>
                            </div>
                            <div>
                                <p>Nós adoramos Aquele que faz</p>
                                <p>Vento aos Teus anjos</p>
                                <p>Nós adoramos Aquele que faz</p>
                                <p>Fogo aos Teus ministros</p>
                            </div>
                            <div>
                                <p>Nós adoramos Aquele que faz</p>
                                <p>Vento aos Teus anjos</p>
                                <p>Nós adoramos Aquele que faz</p>
                                <p>Fogo aos Teus ministros</p>
                            </div>
                            <div>
                                <p>Nós somos Seus ministros</p>
                                <p>Não negue o Seu fogo</p>
                                <p>Nós somos Seus ministros</p>
                                <p>Queremos queimar! Queremos queimar!</p>
                            </div>
                            <div>
                                <p>Nós somos Seus ministros</p>
                                <p>Não negue o Seu fogo</p>
                                <p>Nós somos Seus ministros</p>
                                <p>Queremos queimar! Queremos queimar!</p>
                            </div>
                            <div>
                                <p>Nós somos Seus ministros</p>
                                <p>Não negue o Seu fogo</p>
                                <p>Nós somos Seus ministros</p>
                                <p>Queremos queimar! Queremos queimar!</p>
                            </div>
                            <div>
                                <p>Nós somos Seus ministros</p>
                                <p>Não negue o Seu fogo, Deus!</p>
                                <p>Nós somos Seus ministros</p>
                                <p>Queremos queimar! Queremos queimar!</p>
                            </div>
                        </div>
                        </div>
                        <div className='about-artist-card'>
                    <div className='artist-photo-morada'>
                        <h5 className='artist-title'>About the artist</h5>
                    </div>
                    <div className='artist-info'>
                        <div>
                            <h4>MORADA</h4>
                            <p>2.4M monthly listeners</p>
                            
                               
                        </div>
                        <button className='follow-button' onClick={() => setIsFollowing(!isFollowing)}>{isFollowing ? 'Following' : 'Follow'}</button>
                    </div>
                    <div className='artist-description'>

                        <span >
                        O MORADA é uma banda que tem por ansioso "gritas nos telhados o que Deus Tem 
                        sussurrado em seus ouvidos". Com pouco mais de 10 anos de estrada  </span> <Link to='/spotify/MORADA'><button  className='see-more'>...see more</button></Link>
                        
                    </div>
                    
                </div>
                <div className='about-artist-card'>
                        <div className='card-credit-title'>
                            <h4>Credits</h4>
                        </div>
                        <div className='card-credit'>
                            <div className='card-credit-text'>
                                <h5>MORADA</h5>
                                <p className='credit-text'>Main Artist</p>
                            </div>
                            <button className='follow-button' onClick={() => setIsFollowing(!isFollowing)}>{isFollowing ? 'Following' : 'Follow'}</button>
                        </div>
                        <div className='card-credit'>
                            <div className='card-credit-text'>
                                <h5>Brunão Morada</h5>
                                <p className='credit-text'>Composer, Producer</p>
                            </div>
                        </div>
                        <div className='card-credit'>
                            <div className='card-credit-text'>
                                <h5>Felipe Henri</h5>
                                <p className='credit-text'>Producer</p>
                            </div>
                        </div>
                    
                
                    
                    
                    
                </div>
            </div>  
            


        </div>

    )
}
 
export default SpotifyPage;