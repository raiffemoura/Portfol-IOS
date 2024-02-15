import React, { useState} from 'react'
import Header from '../components/Header'
import iconConfig from '../components/iconConfig'
import HomeButton from '../components/HomeButton'
import '../styles/settings.css'
import { useTranslation } from 'react-i18next'
const Settings = () => {
    const { t } = useTranslation();
    const [switchOn, setSwitchOn] = useState(false)
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

                  

                    <div className='settings-box-top'>
                        <div className='img-icon'><img src={iconConfig.airplaneIconOrange} alt="" srcset="" /></div>
                    <div className='settings-box-text img-arrow'>
                        <p>Airplane Mode</p>
                        <div onClick={() => setSwitchOn(!switchOn)} className={ switchOn ? 'switch-on' : 'switch-off'}>
                            <div className={switchOn ? 'circle-on' : 'circle-off'}></div>
                        </div>
                    </div>

                    </div>
                    <div className='border-line-box'>
                        <div className='border-line'></div>
                    </div>
                    
                    <div className='settings-box-middle'>
                        <div className='img-icon'><img src={iconConfig.bluetoothIcon} alt="" srcset="" /></div>
                        <div className='settings-box-text img-arrow'>
                            <p>Buetooth</p>
                            <img src={iconConfig.arrowBackRight} alt="" />
                        </div>
                    </div>

                    <div className='border-line-box'>
                        <div className='border-line'></div>
                    </div>

                    <div className='settings-box-middle'>
                        <div className='img-icon'><img src={iconConfig.bluetoothIcon} alt="" srcset="" /></div>
                        <div className='settings-box-text img-arrow'>
                            <p>Buetooth</p>
                            <img src={iconConfig.arrowBackRight} alt="" />
                        </div>
                    </div>

                    <div className='border-line-box'>
                        <div className='border-line'></div>
                    </div>

                    <div className='settings-box-middle'>
                        <div className='img-icon'><img src={iconConfig.bluetoothIcon} alt="" srcset="" /></div>
                        <div className='settings-box-text img-arrow'>
                            <p>Buetooth</p>
                            <img src={iconConfig.arrowBackRight} alt="" />
                        </div>
                    </div>

                    <div className='border-line-box'>
                        <div className='border-line'></div>
                    </div>


                    <div className='settings-box-bottom'>
                    <div className='img-icon'><img src={iconConfig.bluetoothIcon} alt="" srcset="" /></div>
                        <div className='settings-box-text img-arrow'>
                            <p>Buetooth</p>
                            <img src={iconConfig.arrowBackRight} alt="" />
                        </div>
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