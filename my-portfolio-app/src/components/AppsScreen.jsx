import React, { useState, useContext } from 'react';
import { PageContext } from '../context/PageContext';
import { Link } from 'react-router-dom';
import CalendarApp from '../components/CalendarApp';

import mail from '../assets/apps/mail.png';
import calendar from '../assets/apps/calendar.png';
import photos from '../assets/apps/photos.png';
import camera from '../assets/apps/camera.png';

import facetime from '../assets/apps/facetime.png';
import clock from '../assets/apps/clock.png';
import weather from '../assets/apps/weather.png';
import reminders from '../assets/apps/reminders.png';

import notes from '../assets/apps/notes.png';
import stocks from '../assets/apps/stocks.png';
import appStore from '../assets/apps/app store.png';
import health from '../assets/apps/health.png';

import calculator from '../assets/apps/calculator.png';
import googleMaps from '../assets/apps/google-maps.png';
import contacts from '../assets/apps/contacts.png';
import settings from '../assets/apps/settings.png';

import spotify from '../assets/apps/spotify.png';
import linkedin from '../assets/apps/linkedin.png';
import instagram from '../assets/apps/instagram.png';
import github from '../assets/apps/github.png';


const AppsScreen = () => {


function apps(app, appName){
    return(
       <div>
            <div className='img-hover'>
                <img src={app} alt={app} />
                
            </div> 
            <p className='apps-text'>{appName}</p>
        </div>
        
    )
}

const [isFirstPage, setIsFirstPage] = useState(true);
const [isSlided, setIsSlided] = useContext(PageContext);


const handleClick = () => {
    setIsFirstPage(!isFirstPage);
   
  }

  const handleGoogleMapsClick = () => {
    window.location.reload();
    window.location.href = '/Google-Maps';
  };

  

return ( 
        <div className="apps-screen" >
            <div onClick={handleClick} className={`apps ${isSlided ? 'slide3' : 'slide'}`} id='APPS'>
                <div className="apps-line">
                <Link to={"/Mail"}>
                    {apps(mail, "Mail" )}
                </Link>
                <Link to={"/Calendar"}>
                    <CalendarApp />
                </Link>
                <Link to={"/Photos"}>
                    {apps(photos, "Photos")}
                </Link>
                <Link to={"/Camera"}>
                    {apps(camera, "Camera")}
                </Link>
                </div>
                <div className="apps-line">
                <Link to={"/FaceTime"}>
                    {apps(facetime, "FaceTime")}
                </Link>
                <Link to={"/Clock"}>
                    {apps(clock, "Clock")}
                </Link>
                <Link to={"/Wather"}>
                    {apps(weather, "Weather")}
                </Link>
                <Link to={"/Reminders"}>
                    {apps(reminders, "Reminders")}
                </Link>

                </div>
                <div className="apps-line">
                <Link to={"/Notes"}>
                    {apps(notes, "Notes")}
                </Link>
                <Link to={"/Stocks"}>
                    {apps(stocks, "Stocks")}
                </Link>
                <Link to={"/AppStore"}>
                    {apps(appStore, "App Store")}
                </Link>
                <Link to={"/Health"}>
                    {apps(health, "Health")}
                </Link>
                </div>
                <div className="apps-line">
                <Link to={"/Calculator"}>
                    {apps(calculator, "Calculator")}
                </Link>
                <div onClick={handleGoogleMapsClick}>
                    {apps(googleMaps, "Google Maps")}
                </div>
                <Link to={"/phone/Contacts"}>
                    {apps(contacts, "Contacts")}
                </Link>
                <Link to={"/Settings"}>
                    {apps(settings, "Settings")}
                </Link>
                </div>
                <div className="apps-line">
                <Link to={"/Spotify/Peregrino"}>
                    {apps(spotify, "Spotify")}
                </Link>
                <Link target='_blank' to={"https://www.linkedin.com/in/raiffemoura/"}>
                    {apps(linkedin, "LinkedIn")}
                </Link>
                <Link target='_blank' to={"http://instagram.com/raiffemoura"}>
                    {apps(instagram, "Instagram")}
                </Link>
                <Link target='_blank' to={"https://github.com/raiffemoura"}>
                    {apps(github, "Github")}
                </Link>
                </div>
                
            </div>
            <div onClick={handleClick} className={`apps ${isSlided ? 'slide4' : 'slide2'}`} id='APPS2'>
            <div className="apps-line">
                {apps(mail, "Mail")}
                {apps(calendar, "Calendar")}
                {apps(photos, "Photos")}
                {apps(camera, "Camera")}
                </div>
               
               
                <div className="apps-line">
                {apps(calculator, "Calculator")}
                {apps(googleMaps, "Google Maps")}
                {apps(contacts, "Contacts")}
                {apps(settings, "Settings")}
                </div>
                <div className="apps-line">
                {apps(spotify, "Spotify")}
                {apps(linkedin, "LinkedIn")}
                {apps(instagram, "Instagram")}
                {apps(github, "Github")}
                </div>
            </div>
            
            {/* <Outlet /> */}
        </div>
     );
}
 
export default  AppsScreen;




