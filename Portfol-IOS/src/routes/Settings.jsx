import React from 'react'
import Header from '../components/Header'
import HomeButton from '../components/HomeButton'
import '../styles/settings.css'
import SettingsPage from '../components/SettingsPage'
import { PageProvider } from '../context/PageContext';
import iconConfig from '../components/iconConfig';
const Settings = () => {
    

    return ( 
        <div>
            {/* <div className="next-updates">
                <img src={iconConfig.nextUpdates} alt="" srcset="" />
            </div> */}
    <div className='container-notes'>
        <div>
            <div className="screen">
            <PageProvider>
                <Header />
                <SettingsPage />
            </PageProvider>
                <HomeButton />
            </div>
        </div>
        
    </div> 
    </div>
);
}
 
export default Settings;