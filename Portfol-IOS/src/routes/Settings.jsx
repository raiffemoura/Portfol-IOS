import React from 'react'
import Header from '../components/Header'
import iconConfig from '../components/iconConfig'
import HomeButton from '../components/HomeButton'
import '../styles/settings.css'
import { useTranslation } from 'react-i18next'
const Settings = () => {
    const { t } = useTranslation();
    return ( <div className='container-notes'>
    <div>
        <div className="screen">
            <Header />
           <div className='settings-container'>
                <div className='settings-header'>
                    <h1>Settings</h1>
                </div>
                <div className='settings-box'>
                    <div className='settings-box-header'>
                        <div>
                            <img src={iconConfig.avatar}  alt="arrow" />
                        </div>
                        <div className='settings-box-header-info img-arrow'>
                            <div className='settings-box-header-info-text'>
                                <p>Raiffe Moura</p>
                                <sub className='color-font'>Apple ID, iCloud+, Media & Purchases</sub>
                            </div>
                            <img src={iconConfig.arrowBackRight} alt="" />
                        </div>
                    </div>

                    <div className='settings-box-body'>
                        <div className=''>
                            <div className='img-icon'>
                                <img src={iconConfig.bluetooth} alt="arrow" />
                            </div>
                        </div>
                        <div className='settings-box-body-info-text img-arrow'>
                            <div>
                                Bluetooth
                            </div>
                            <div>
                                <img src={iconConfig.arrowBackRight} alt="arrow" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div></div>
                        <div></div>
                    </div>
                </div>





           </div>
            <HomeButton />
        </div>
    </div>
    
</div> 
);
}
 
export default Settings;