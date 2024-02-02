import React, { useState, useEffect } from 'react';
import signal from '../assets/signal-reception-gif.gif';
import wifi from '../assets/wifi-gif.gif';
import battery from '../assets/battery/battery.gif';
import camera from '../assets/camera.png';

    

const HeaderSpotify = () => {
    const [currentTime, setCurrentTime] = useState('');

useEffect(() => {


    setInterval(
      () => {
        let hours = new Date().getHours();
        (hours < 10) && (hours = `0${hours}`);
  
        let min = new Date().getMinutes();
        (min < 10) && (min = `0${min}`);
  
        setCurrentTime(
          `${hours}:${min}`
        );
      },
      
    );
  }, [1000]);
    return ( 
        <div className='header-app-spotify'>
            <div id='time'>{currentTime}</div>
            <div className='header-camera'>
              <img src={camera} alt="camera" />
            </div>
            <div className='header-icons'>
                <img src={signal} alt="signal reception icon" />
                <img src={wifi} alt="wifi icon" />
                <img src={battery} alt="battery icon" />
            </div>
        </div>
     );
}
 
export default  HeaderSpotify;