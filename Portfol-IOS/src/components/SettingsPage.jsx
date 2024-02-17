import React, { useState} from 'react'
import iconConfig from './iconConfig';
import { useTranslation } from 'react-i18next'
import i18n from '../i18n/index.ts'

const SettingsPage = () => {
    const [switchOn, setSwitchOn] = useState(false)
    const [showLanguage, setShowLanguage] = useState(false)
    const { t } = useTranslation();

    const line = () => {
        return (
            <div className='border-line-box'>
                <div className='border-line'></div>
            </div>
        )}

    return ( 
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
                                <sub className='color-font'>{t("AppleIDiCloudMediaPurchases")}</sub>
                            </div>
                            <img src={iconConfig.arrowBackRight} alt="" />
                        </div>
                    </div>

                  

                    <div className='settings-box-top'>
                        <div className='img-icon'><img src={iconConfig.airplaneIconOrange} alt="" srcset="" /></div>
                    <div className='settings-box-text img-arrow'>
                        <p>{t("airplaneMode")}</p>
                        <div onClick={() => setSwitchOn(!switchOn)} className={ switchOn ? 'switch-on' : 'switch-off'}>
                            <div className={switchOn ? 'circle-on' : 'circle-off'}></div>
                        </div>
                    </div>

                    </div>
                    {line()}
                    
                    <div className='settings-box-middle'>
                        <div className='img-icon'><img src={iconConfig.wifiIcon} alt="" srcset="" /></div>
                        <div className='settings-box-text img-arrow'>
                            <p>Wi-Fi</p>
                            <div className='settings-wifi'>
                                <p className='color-font'>SkyNet_WiFi</p>
                                <img src={iconConfig.arrowBackRight} alt="" />
                            </div>
                        </div>
                    </div>

                    
                    {line()}

                    <div className='settings-box-middle'>
                        <div className='img-icon'><img src={iconConfig.bluetoothIcon} alt="" srcset="" /></div>
                        <div className='settings-box-text img-arrow'>
                            <p>Buetooth</p>
                            <div className='settings-bluetooth'>
                                <p className='color-font'>On</p>
                                <img src={iconConfig.arrowBackRight} alt="" />
                            </div>
                        </div>
                    </div>

                    {line()}

                    <div className='settings-box-middle'>
                        <div className='img-icon'><img src={iconConfig.cellularIcon} alt="" srcset="" /></div>
                        <div className='settings-box-text img-arrow'>
                            <p>{t("cellular")}</p>
                            <img src={iconConfig.arrowBackRight} alt="" />
                        </div>
                    </div>

                    {line()}


                    <div className='settings-box-bottom'>
                    <div className='img-icon'><img src={iconConfig.hotspotIcon} alt="" srcset="" /></div>
                        <div className='settings-box-text img-arrow'>
                            <p>{t("hotspot")}</p>
                            <img src={iconConfig.arrowBackRight} alt="" />
                        </div>
                    </div>
                    
                </div>

                <div className='settings-box'>
                    <div className='settings-box-top' onClick={() => setShowLanguage(!showLanguage)}>
                        <div className='img-icon'><img src={iconConfig.settingsIcon} alt="" srcset="" /></div>
                        <div className='settings-box-text img-arrow'>
                            <p>{t("languageRegion")}</p>
                            <img src={iconConfig.arrowBackRight} alt="" />
                        </div>
                    </div>
                    {line()}

                    
                        <div className={`settings-box-middle  ${showLanguage ? '' : 'hidden'}`} onClick={() => i18n.changeLanguage("EN")}>
                        <div className='img-icon'>
                            <img src={iconConfig.settingsList} alt="" />
                        </div>
                        <div className='settings-box-text img-arrow'>
                            <p>{t("english")}</p>
                        </div>

                        </div>
                        <div className={`settings-box-middle  ${showLanguage ? '' : 'hidden'}`} onClick={() => i18n.changeLanguage("ptBR")}>
                        <div className='img-icon'>
                            <img src={iconConfig.settingsList} alt="" />
                        </div>
                        <div className='settings-box-text'>
                            <p>{t("portuguese")}</p>
                        </div>
                        </div>
                        
                
                    <div className='settings-box-middle'>
                        <div className='img-icon'><img src={iconConfig.cellularIcon} alt="" srcset="" /></div>
                        <div className='settings-box-text img-arrow'>
                            <p>Cellular</p>
                            <img src={iconConfig.arrowBackRight} alt="" />
                        </div>
                    </div>

                    {line()}

                    <div className='settings-box-bottom'>
                    <div className='img-icon'><img src={iconConfig.hotspotIcon} alt="" srcset="" /></div>
                        <div className='settings-box-text img-arrow'>
                            <p>Personal Hotspot</p>
                            <img src={iconConfig.arrowBackRight} alt="" />
                        </div>
                    </div>
                
                </div>






           </div>
     );
}
 
export default SettingsPage;