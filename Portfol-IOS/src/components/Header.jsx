import React, { useState, useEffect } from 'react';
import signal from '../assets/signal-reception-gif.gif';
import wifi from '../assets/wifi-gif.gif';
import battery from '../assets/battery/battery.gif';
import camera from '../assets/camera.png';
import Notifications from './Noifications';
    

const Header = () => {
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
  }, []);
    return ( 
        <div className='header'>
            <div id='time'>{currentTime}</div>
            <div className='header-camera'>
              <Notifications />
            </div>
            <div className='header-icons'>
                <img src={signal} alt="signal reception icon" />
                <img src={wifi} alt="wifi icon" />
                <img src={battery} alt="battery icon" />
            </div>
        </div>
     );
}
 
export default  Header;