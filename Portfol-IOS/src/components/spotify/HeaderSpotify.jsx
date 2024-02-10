import React, { useState, useEffect } from 'react';
import iconConfig from '../../components/iconConfig';

    

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
  }, []);
    return ( 
        <div className='header-app-spotify'>
            <div id='time'>{currentTime}</div>
            <div className='header-camera'>
              <img src={iconConfig.camera} alt="camera" />
            </div>
            <div className='header-icons'>
                <img src={iconConfig.signal} alt="signal reception icon" />
                <img src={iconConfig.wifi} alt="wifi icon" />
                <img src={iconConfig.battery} alt="battery icon" />
            </div>
        </div>
     );
}
 
export default  HeaderSpotify;