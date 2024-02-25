import React, { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import HomeButton from '../components/HomeButton';
import { useTranslation } from 'react-i18next'
import '../styles/weather.css'
import iconConfig from '../components/iconConfig';



const Weather = () => {

    const [city, setCity] = useState('')
    const [weatherForecast, setWeatherForecast] = useState(null)
    const [cityLoaded, setCityLoaded] = useState(false);
    const inputRef = useRef(null)
    const weatherHoursRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const { t } = useTranslation();

    useEffect(() =>  {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async function (position) {
                const userLatitude = position.coords.latitude;
                const userLongitude = position.coords.longitude;
    
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${userLatitude}&lon=${userLongitude}&format=json`);
                const data = await response.json();
    
                const cityName = data.address.city;
                setCity(clearSpecialChars(cityName));
                

                setCityLoaded(true); 
            });
        
        }
    }, []);

    useEffect(() => {
        if (cityLoaded) {
            handleSearch();
        }
    }, [cityLoaded]);
  
    const line = () => {
        return (
            <div className='weather-border-line-box'>
                <div className='weather-border-line'></div>
            </div>
        )}

    const handleChange = (e) => {
        setCity(clearSpecialChars(e.target.value))

    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const handleSearch = () => {
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=5d97fe619b214861ae5171040242302&q=${city}&lang=${t("language")}`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((data)=>{
            console.log(data);
            setWeatherForecast(data); 
        })
    }

    const clearSpecialChars= (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, '');
    }

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setStartX(e.pageX - weatherHoursRef.current.offsetLeft);
        setScrollLeft(weatherHoursRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsMouseDown(false);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleMouseMove = (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - weatherHoursRef.current.offsetLeft;
        const walk = (x - startX) * 1.4;
        weatherHoursRef.current.scrollLeft = scrollLeft - walk;
    };

    return ( 
        <div className='container-weather-cloudly '>
            <div>
                <div className="screen">
                    <Header />
                    <div className='weather-screen'>
                        <div className='weather-input'>
                            <input 
                            className='weather-input-search' 
                            type="text" placeholder='Search' 
                            ref={inputRef} 
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            />
                            <div className='search-icon' 
                            onClick={handleSearch}>
                                
                            </div>
                        </div>
                        <div className='weather-header'>
                            {weatherForecast?.location?.name? <h1>{weatherForecast?.location?.name}</h1> : "--"}
                            {weatherForecast?.current?.temp_c? <h1>{weatherForecast?.current?.temp_c}°</h1> : "--"}
                            {weatherForecast?.current?.condition?.text? <p>{weatherForecast?.current?.condition?.text}</p> : "--"}
                            <p>{t("high")} {weatherForecast ? weatherForecast.forecast.forecastday[0].day.maxtemp_c : "--"} {t("low")} {weatherForecast ? weatherForecast.forecast.forecastday[0].day.mintemp_c : "--"}</p>
                        </div>
                        <div className='weather-box weather-box-night'>
                            <div className='weather-condition'>
                                <img src={iconConfig.weatherWatch} alt="watch" />
                                <p>{t("hourlyForecast")}</p>
                            </div>
                        {line()}
                        <div className='weather-hours'
                        ref={weatherHoursRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}>
                            {weatherForecast? weatherForecast.forecast.forecastday[0].hour.map((hour, index) => (
                                <div className='weather-hour' key={index}>
                                    <div>{hour.time.slice(11, 13)}</div>
                                    <img src={hour.condition.icon} alt="weather condition" />
                                    <div>{hour.temp_c}°</div>
                                    
                                </div> 
                            )) : ""}
                            
                            
                    
                        </div>
                        </div>

                        {/* <div className='weather-box weather-box-night'> <p>3 days forecast</p>
                        {line()}
                        <div className='weather-days'>
                            <div className='weather-day'>
                            <div>day</div>
                                <div>0°</div>
                                <div>0°</div>
                            </div>
                            {line()}

                            <div className='weather-day'>
                            <div>day</div>
                                <div>0°</div>
                                <div>0°</div>
                            </div>
                            {line()}

                            <div className='weather-day'>
                                <div>day</div>
                                <div>0°</div>
                                <div>0°</div>
                            </div>
                         
                        </div>
                        </div> */}

                        <div className='weather-container'>
                            <div className='weather-box weather-box-night'>
                                <div className='weather-condition-small'>
                                    <img src={iconConfig.weatherWatch} alt="" />
                                    <p>{t("UV")}</p>
                                </div>
                                
                                    <h1>{weatherForecast? weatherForecast.current.uv : "0"}</h1>
                                    <h3>
                                        {weatherForecast ? (
                                            weatherForecast.current.uv <= 2 ? t("UVLow")
                                            : weatherForecast.current.uv <= 5 ? t("UVModerate")
                                            : weatherForecast.current.uv <= 7 ? t("UVHigh")
                                            : weatherForecast.current.uv <= 10 ? t("UVVeryHigh")
                                            : t("UVExtreme")
                                        ) : "0"}
                                    </h3>
                                    <div>
                                    <input type="range" min="0" max="12" disabled={true}  value={weatherForecast? weatherForecast.current.uv : "0"} />
                                     </div>                          
                            </div>

                            <div className='weather-box weather-box-night'>
                                <div className='weather-condition-small'>
                                    <img src={iconConfig.weatherWatch} alt="" />
                                    <p>{t("sunrise")}</p>
                                </div>
                                
                                <h1>
                                    {weatherForecast ? weatherForecast.forecast.forecastday[0].astro.sunset.slice(0, 5) : "0"}
                                </h1>
                                <div className='sunrise-img'>
                                    <img  src={iconConfig.sunset} alt="sunset"  />
                                    <p>{t("sunset")}: {weatherForecast ? weatherForecast.forecast.forecastday[0].astro.sunset.slice(0, 5) : "0"}</p>
                                </div>
                                    
                                                              
                            </div>

                            
                        </div>

                        <div className='weather-container'>
                        <div className='weather-box weather-box-night'>
                                <div className='weather-condition-small'>
                                    <img src={iconConfig.weatherWatch} alt="" />
                                    <p className='font-size-1'>{t("feelsLike")}</p>
                                </div>
                                
                                    <h1>{weatherForecast? weatherForecast.current.feelslike_c + "°" : "0"}</h1>
                                    <h3>
                                    {weatherForecast ? (
                                            weatherForecast.current.feelslike_c <= 0 ? t("feelsLikeVeryLow")
                                            : weatherForecast.current.feelslike_c <= 10 ? t("feelsLikeLow")
                                            : weatherForecast.current.feelslike_c <= 15 ? t("feelsLikeModerate")
                                            : weatherForecast.current.feelslike_c <= 20 ? t("feelsLikeHigh")
                                            : t("feelsLikeVeryHigh")
                                        ) : "0"}
                                    </h3>  
                                
                            </div>


                            <div className='weather-box weather-box-night'>
                                <div className='weather-condition-small'>
                                    <img src={iconConfig.weatherWatch} alt="" />
                                    <p className='font-size-1'>{t("visibility")}</p>
                                </div>
                                
                                    <h1>{weatherForecast? weatherForecast.current.vis_km + " km" : "0km"}</h1>
                                    <p className='font-size-2'>
                                    {weatherForecast ? (
                                            weatherForecast.current.vis_km <= 1 ? t("visibilityVeryBad")
                                            : weatherForecast.current.vis_km <= 2 ? t("visibilityBad")
                                            : weatherForecast.current.vis_km <= 5 ? t("visibilityModerate")
                                            : weatherForecast.current.vis_km <= 10 ? t("visibilityGood")
                                            : t("visibilityVeryGood")
                                        ) : " -- "}
                                    </p>  
                                
                            </div>

                            
                            
                        </div>

                        <div className='weather-container'>
                            <div className='weather-box weather-box-night'>
                                <div className='weather-condition-small'>
                                    <img src={iconConfig.weatherWatch} alt="" />
                                    <p className='font-size-1'>{t("humidity")}</p>
                                </div>
                                
                                    <h1>{weatherForecast? weatherForecast.current.humidity + "%" : "0%"}</h1>
                                    <p className='font-size-2'>
                                    {weatherForecast ? (
                                            weatherForecast.current.feelslike_c <= 30 ? t("humidityVeryLow")
                                            : weatherForecast.current.feelslike_c <= 50 ? t("humidityLow")
                                            : weatherForecast.current.feelslike_c <= 60 ? t("humidityModerate")
                                            : weatherForecast.current.feelslike_c <= 80 ? t("humidityHigh")
                                            : t("humidityVeryHigh")
                                        ) : " -- "}
                                    </p>  
                                
                            </div>

                            <div className='weather-box weather-box-night'>
                                <div className='weather-condition-small'>
                                    <img src={iconConfig.weatherWatch} alt="" />
                                    <p>{t("precipitation")}</p>
                                </div>
                                
                                <h2>
                                {weatherForecast ? ((weatherForecast.current.precip_mm / 10).toFixed(2) + " cm") : "0"}
                                </h2>
                                
                                    <p>
                                    {weatherForecast ? ((weatherForecast.forecast.forecastday[0].day.totalprecip_mm / 10).toFixed(2) + t("precipitationToday")) : "0"}
                                    </p>
                                
                                    
                                                              
                            </div>
                            
                        </div>
                        
                            

                            
                    </div>
                    <div className='weather-adjust-home-button'>
                        <HomeButton />
                    </div>

                </div>
            </div>
        </div>
)
}
 
export default Weather;