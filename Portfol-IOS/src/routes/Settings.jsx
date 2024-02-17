import React from 'react'
import Header from '../components/Header'
import HomeButton from '../components/HomeButton'
import '../styles/settings.css'
import SettingsPage from '../components/SettingsPage'
import { PageProvider } from '../context/PageContext';

const Settings = () => {
    
    
        


    return ( 
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
);
}
 
export default Settings;