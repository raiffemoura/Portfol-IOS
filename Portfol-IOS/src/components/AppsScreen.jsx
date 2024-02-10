import React, { useState, useContext } from 'react';
import { PageContext } from '../context/PageContext';
import { Link } from 'react-router-dom';
import CalendarApp from '../components/CalendarApp';
import iconConfig from './iconConfig';



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
const [isSlided] = useContext(PageContext);


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
                    {apps(iconConfig.mailApp, "Mail" )}
                </Link>
                <Link to={"/Calendar"}>
                    <CalendarApp />
                </Link>
                <Link to={"/Photos"}>
                    {apps(iconConfig.photosApp, "Photos")}
                </Link>
                <Link to={"/Camera"}>
                    {apps(iconConfig.cameraApp, "Camera")}
                </Link>
                </div>
                <div className="apps-line">
                <Link to={"/FaceTime"}>
                    {apps(iconConfig.facetimeApp, "FaceTime")}
                </Link>
                <Link to={"/Clock"}>
                    {apps(iconConfig.clockApp, "Clock")}
                </Link>
                <Link to={"/Wather"}>
                    {apps(iconConfig.weatherApp, "Weather")}
                </Link>
                <Link to={"/Reminders"}>
                    {apps(iconConfig.remindersApp, "Reminders")}
                </Link>

                </div>
                <div className="apps-line">
                <Link to={"/Notes"}>
                    {apps(iconConfig.notesApp, "Notes")}
                </Link>
                <Link to={"/Stocks"}>
                    {apps(iconConfig.stocksApp, "Stocks")}
                </Link>
                <Link to={"/AppStore"}>
                    {apps(iconConfig.appStoreApp, "App Store")}
                </Link>
                <Link to={"/Feedback"}>
                    {apps(iconConfig.feedbackApp, "Feedback")}
                </Link>
                </div>
                <div className="apps-line">
                <Link to={"/Calculator"}>
                    {apps(iconConfig.calculatorApp, "Calculator")}
                </Link>
                <div onClick={handleGoogleMapsClick}>
                    {apps(iconConfig.googleMapsApp, "Google Maps")}
                </div>
                <Link to={"/phone/Contacts"}>
                    {apps(iconConfig.contactsApp, "Contacts")}
                </Link>
                <Link to={"/Settings"}>
                    {apps(iconConfig.settingsApp, "Settings")}
                </Link>
                </div>
                <div className="apps-line">
                <Link to={"/Spotify/Peregrino"}>
                    {apps(iconConfig.spotifyApp, "Spotify")}
                </Link>
                <Link target='_blank' to={"https://www.linkedin.com/in/raiffemoura/"}>
                    {apps(iconConfig.linkedinApp, "LinkedIn")}
                </Link>
                <Link target='_blank' to={"http://instagram.com/raiffemoura"}>
                    {apps(iconConfig.instagramApp, "Instagram")}
                </Link>
                <Link target='_blank' to={"https://github.com/raiffemoura"}>
                    {apps(iconConfig.githubApp, "Github")}
                </Link>
                </div>
                
            </div>
            <div onClick={handleClick} className={`apps ${isSlided ? 'slide4' : 'slide2'}`} id='APPS2'>
            <div className="apps-line">
                {apps(iconConfig.mailApp, "Mail")}
                {apps(iconConfig.calendarApp, "Calendar")}
                {apps(iconConfig.photosApp, "Photos")}
                {apps(iconConfig.cameraApp, "Camera")}
                </div>
               
               
                <div className="apps-line">
                {apps(iconConfig.calculatorApp, "Calculator")}
                {apps(iconConfig.googleMapsApp, "Google Maps")}
                {apps(iconConfig.contactsApp, "Contacts")}
                {apps(iconConfig.settingsApp, "Settings")}
                </div>
                <div className="apps-line">
                {apps(iconConfig.spotifyApp, "Spotify")}
                {apps(iconConfig.linkedinApp, "LinkedIn")}
                {apps(iconConfig.instagramApp, "Instagram")}
                {apps(iconConfig.githubApp, "Github")}
                </div>
            </div>
            
        </div>
     );
}
 
export default  AppsScreen;




