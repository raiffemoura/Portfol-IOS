import React , { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import arrowBack from '../../assets/icons/arrow-back.png';
import Morada from '../../assets/spotify-images/morada.jpg'
import Twitter from '../../assets/icons/twitter.png'
import Instagram from '../../assets/icons/instagram-white.png'
import Facebook from '../../assets/icons/facebook-white.png'
// import HomeButtonSticky from '../HomeButtonSticky'

const AboutMorada = () => {     

    return (  
        
        
        
        
        
        <div className='spotify-page'>
            <div className='header-spotify'>
                <Link to={"/Spotify/uma-coisa"} ><img style={{height: '18px'}} src={arrowBack} alt="arrowBack" /></Link>
                <p className='spotify-header-text'>MORADA</p>
                <div></div> 
             </div> 
            <div>
                <div className='about-artist-card'>
                    <div className='artist-photo-morada'>
                    </div>
                    <div className='artist-info-morada'>
                            <h2>2,359,202</h2>
                            <p>monthly listeners</p>
                    </div>
                    <div className='artist-description'>

                       <p>
                        O <b style={{color: 'white'}}>MORADA</b> é uma banda que tem por ansioso
                        "gritar nos telhados o que Deus tem sussurrado em seus ouvidos".
                        Com pouco mais de 10 anos de estrada, o ministério tem alcançado cada vez 
                        mais um público diversificado desde crianças aos mais velhos, proporcionando assim, 
                        momentos intensos e alegres entre as famílias por onde tem passado. Isso se deve 
                        à diversidade musical que a banda possui e o cuidado que tem de sempre fazer um som 
                        que tocou a todos. Seu último lançamento foi o álbum <b style={{color: 'white'}}>Lembre-se 2000's</b>. Ouça e seja
                        encorajado(a)! </p>
                       
                         <div className='artist-icon'>
                           <img src={Morada} />
                            <div> Posted by MORADA</div>
                        </div>
                        <div className='social-icon'>
                            <Link target='_blank' to={"https://twitter.com/Moradaoficial"}>
                               <img  src={Twitter}/>
                            </Link>
                            <Link target='_blank' to={"https://twitter.com/Moradaoficial"}>
                                <div> X</div>
                            </Link>
                        </div>
                        <div className='social-icon'>
                            <Link target='_blank' to={"https://www.instagram.com/moradaoficial"}> 
                                <img  src={Instagram}/>
                            </Link>
                            <Link target='_blank' to={"https://www.instagram.com/moradaoficial"}> 
                                <div> Instagram</div>
                            </Link>
                        </div>
                        <div className='social-icon'>
                        <Link target='_blank' to={"https://www.facebook.com/ministeriomorada"}> 
                                <img  src={Facebook}/>
                            </Link>
                            <Link target='_blank' to={"https://www.facebook.com/ministeriomorada"}> 
                                <div> Facebook</div>
                            </Link>
                        </div>
                        
                    </div>
                    
                </div>
             
            </div>                    
            {/* <HomeButtonSticky /> */}

        </div>

    );
}
 
export default AboutMorada;