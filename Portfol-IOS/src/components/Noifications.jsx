import React, { useState, useEffect } from 'react'
import iconConfig from './iconConfig';
import '../styles/notifications.css'
const Notifications = () => {
    const [msg, setMsg] = useState(true);
    const [msgFeedback, setMsgFeedback] = useState(true);
    

    const notificationActiveTimer = () => {
            setTimeout(() => {
                setMsg(false);
                setTimeout(() => {
                    setMsg(true);
                }, 12000);
        }, 500);

    };

    const notificationFeedback = () => {
        setTimeout(() => {
            setMsgFeedback(false);
            setTimeout(() => {
                setMsgFeedback(true);
            }, 12000);
    }, 500);
};

useEffect(() => {
    const lastNotificationTip = localStorage.getItem('lastNotificationTip');
    const lastNotificationFeedback = localStorage.getItem('lastNotificationFeedback');
    let tipShowed = localStorage.getItem('tipShowed'); 
    const currentTime = new Date().getTime();

    if (tipShowed === null) {
        setTimeout(() => {
            
            tipShowed = 'false';
            localStorage.setItem('tipShowed', 'false');
        }, 8800);
    }

    if (tipShowed === 'true') {
        if (!lastNotificationFeedback || (currentTime - lastNotificationFeedback > 6 * 60 * 60 * 1000 )) { 
            setTimeout(() => {
                
                notificationFeedback();
                localStorage.setItem('lastNotificationFeedback', currentTime);
                localStorage.setItem('tipShowed', "false"); 
            }, 9000);
        }
    } else { 
        if (!lastNotificationTip || (currentTime - lastNotificationTip > 6 * 60 * 60 * 1000)) {
            setTimeout(() => {
                notificationActiveTimer();
                localStorage.setItem('lastNotificationTip', currentTime);
                localStorage.setItem('tipShowed', "true");
            }, 9000); 
        } 
    }
}, []);


    return ( 
        <div>
            <div className='notification-container'>
                <div  className={`notification ${msg ? 'desactived' : 'actived'}`}>
                    {!msg ?  
                    <div className='notification-icon '>
                        <img className={ msg ? "notification-text-desactived" : "notification-text-actived "} src={iconConfig.avatar} alt="" />  
                    </div>:""}
                    {!msg ?<div className='notification-text'>
                        <p className={ msg ? "notification-text-desactived" : "notification-text-actived text-color "}>Raiffe Moura</p>
                        <p className={ msg ? "notification-text-desactived" : "notification-text-actived "}>
                            Hey, there? Just a quick tip, you can change the language, theme, and more in the <b style={{color: 'orange'}}>Settings App!</b></p>
                    </div>:""}
                    
                </div>
                <div  className={`notification ${msgFeedback ? 'desactived' : 'actived'}`}>
                    {!msgFeedback ?  
                    <div className='notification-icon '>
                        <img className={ msgFeedback ? "notification-text-desactived" : "notification-text-actived "} src={iconConfig.avatar} alt="" />  
                    </div>:""}
                    {!msgFeedback ?<div className='notification-text'>
                        <p className={ msgFeedback ? "notification-text-desactived" : "notification-text-actived text-color "}>Raiffe Moura</p>
                        <p className={ msgFeedback ? "notification-text-desactived" : "notification-text-actived "}>
                        Please, don't forget to leave your feedback on <b style={{color: 'orange'}}>Feedback App!</b> Thank you!</p>
                    </div>:""}
                </div>
            </div>
        </div>
     );
}
 
export default Notifications;