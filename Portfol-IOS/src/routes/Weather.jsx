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
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=5d97fe619b214861ae5171040242302&q=${city}&lang=en`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404 || response.status === 400) {
                alert('City not found, please try again!');
            }
        })
        .then((data)=>{
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

    
    const moonPhases = () => {
        if (weatherForecast) {
            
                
            const moon_phase = weatherForecast.forecast.forecastday[0].astro.moon_phase;
            
            if (moon_phase === "New Moon" || moon_phase === "New") {
                return iconConfig.moonNew;
            } 
            else if (moon_phase === "Waxing Crescent") {
                return iconConfig.moonWaxingCrescent;
            }
            else if (moon_phase === "First Quarter") {
                return iconConfig.moonFirstQuarter;
            }
            else if (moon_phase === "Waxing Gibbous") {
                return iconConfig.moonWaxingGibbous;
            }
            else if (moon_phase === "Waning Gibbous") {
                return iconConfig.wanningGibbous;
            }
            else if (moon_phase === "Third Quarter") {
                return iconConfig.moonThirdQuarter;
            }
            else if (moon_phase === "Waning Crescent") {
                return iconConfig.moonWaningCrescent;
            } else {
                return iconConfig.moonFull;
            }
        }
    }

    const now = new Date().getHours();
    const formatWeather = (weatherCondition) => {
        return weatherCondition ? weatherCondition.toLowerCase().trim() : weatherCondition;
    };
    const weatherbackground = () => {
        const condition = formatWeather(weatherForecast?.current?.condition?.text) 
        if (condition === "cloudy" || 
            condition === "mostly cloudy" ||
            condition === "overcast" ||
            condition === "patchy rain nearby" ||
            condition === "mist" ||
            condition === "fog" ||
            condition === "partly cloudy") {
                return "cloudly"
        }
        else if (condition === "rain" ||
            condition === "raining" ||
            condition === "cloudy with rain" ||
            condition === "light rain" ||
            condition === "light rain shower" ||

            condition === "moderate rain" ||
            condition === "heavy rain" ||
            condition === "drizzle" ||
            condition === "showers" ||
            condition === "thunderstorms and rain" ||
            condition === "freezing rain") { 
                return "raining"
        }
        else if (condition === "thunderstorm" ||
            condition === "storm" ||
            condition === "severe thunderstorm" ||
            condition === "thunderstorms and hail" ||
            condition === "hailstorm" ||
            condition === "tornardo" ||
            condition === "hurricane" ) {
            return "thunderstorm"            
        }
        else if (condition === "snow" ||
            condition === "snowing" || 
            condition === "sleet" ||
            condition === "sleetstorm" ||
            condition === "hail" ||
            condition === "hailstorm" ||
            condition === "light snow" ||
            condition === "moderate snow" ||
            condition === "heavy snow" ||
            condition === "thunderstorms and snow" ||
            condition === "blowing snow" ||
            condition === "snowstorm") {
            return "snow"                        
        }
        else if (condition === "clear sky" ||
                condition === "mostly clear" ||
                condition === "sunny" || 
                condition === "mostly sunny" ||
                condition === "partly sunny" ||
                condition === "fair" 
                ) {
            return "day"    
        }
        else if (condition === "clear night" ||
                condition === "mostly clear night" ||
                condition === "clear" ||
                condition === "cloudy night" ||
                condition === "overcast night" || 
                condition === "partly cloudy night" ||
                condition === "night" ||
                condition === "mostly cloudy night") {
            return "night"   
                                                        
            
        }
        else {
            return "temp"
        }
    }
    
    const handlePlaceChanged = () => {
        const [place] = inputRef.current.getPlaces();
         if (place) {
             console.log(place.formatted_address);
             console.log(place.geometry.location.lat());
             console.log(place.geometry.location.lng());

         }
    }
    return ( 
        <div className={`container-weather-${weatherbackground()}`}>
            <div>
                <div className="screen">
                    <Header />
                    <div className='weather-screen'>
                        <div className='weather-input'>

                            
                            <input 
                            className='weather-input-search' 
                            type="text" placeholder={t("search")} 
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
                            {weatherForecast?.location?.country? <p>{weatherForecast?.location?.region}, {weatherForecast?.location?.country}</p> : "--"}
                            {weatherForecast?.current?.temp_c? <h1>{weatherForecast?.current?.temp_c}°</h1> : "--"}
                            {weatherForecast?.current?.condition?.text? <p>{t(formatWeather(weatherForecast?.current?.condition?.text))}</p> : "--"}
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
                                    <div>{hour.time.slice(11, 13) === now? t("now") : hour.time.slice(11, 13)}</div>
                                    <img src={hour.condition.icon} alt="weather condition" />
                                    <div>{hour.temp_c}°</div>
                                    
                                </div> 
                            )) : ""}
                            
                            
                    
                        </div>
                        </div>
                        <div  className='weather-container-center'>
                            <div className='weather-box weather-box-night'>
                                <div className='weather-condition-small'>
                                    <img src={iconConfig.weatherWatch} alt="icon" />
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
                                    <img src={iconConfig.weatherWatch} alt="icon" />
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
                                    <img src={iconConfig.weatherWatch} alt="icon" />
                                    <p className='font-size-1'>{t("feelsLike")}</p>
                                </div>
                                
                                    <h1>{weatherForecast? weatherForecast.current.feelslike_c + "°" : "0"}</h1>
                                    <p className='font-size-2'>
                                    {weatherForecast ? (
                                            weatherForecast.current.feelslike_c <= 0 ? t("feelsLikeVeryLow")
                                            : weatherForecast.current.feelslike_c <= 10 ? t("feelsLikeLow")
                                            : weatherForecast.current.feelslike_c <= 15 ? t("feelsLikeModerate")
                                            : weatherForecast.current.feelslike_c <= 20 ? t("feelsLikeHigh")
                                            : t("feelsLikeVeryHigh")
                                        ) : "0"}
                                    </p>  
                                
                        </div>


                        <div className='weather-box weather-box-night'>
                            <div className='weather-condition-small'>
                                <img src={iconConfig.weatherWatch} alt="icon" />
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

                        <div className='weather-box weather-box-night'>
                            <div className='weather-condition'>
                                <img src={iconConfig.weatherWatch} alt="watch" />
                                <p>{t("moonPhase")}
                               
                                {weatherForecast ? (
                                              weatherForecast.forecast.forecastday[0].astro.moon_phase == "Waning Crescent" ? t("moonWaningCrescent")
                                            : weatherForecast.forecast.forecastday[0].astro.moon_phase == "Waxing Crescent" ? t("moonWaxingCrescent")
                                            : weatherForecast.forecast.forecastday[0].astro.moon_phase == "First Quarter" ? t("moonFirstQuarter")
                                            : weatherForecast.forecast.forecastday[0].astro.moon_phase == "Waxing Gibbous" ? t("moonWaxingGibbous")
                                            : weatherForecast.forecast.forecastday[0].astro.moon_phase == "Full Moon" ? t("moonFull")
                                            : weatherForecast.forecast.forecastday[0].astro.moon_phase == "Waning Gibbous" ? t("moonWaningGibbous")
                                            : weatherForecast.forecast.forecastday[0].astro.moon_phase == "Third Quarter" ? t("moonThirdQuarter")
                                            : t("moonNew")
                                        ) : " -- "}
                                </p>
                            </div>
                            {line()}
                            <div className='moon-phase-container'>
                                    <div className='moon-phase-box'>
                                        <div className='moon-phase-text '>
                                            <p>{t("illumination")}</p>
                                            <p className='moon-phase-text-info'>{weatherForecast? weatherForecast.forecast.forecastday[0].astro.moon_illumination + "%" : " -- "}</p>
                                        </div>
                                        {line()}

                                        <div className='moon-phase-text'>
                                            <p>{t("moonrise")}</p>
                                            <p className='moon-phase-text-info'>{weatherForecast? weatherForecast.forecast.forecastday[0].astro.moonrise.slice(0, 5) : " -- "}</p>
                                        </div>
                                        {line()}

                                        <div className='moon-phase-text'>
                                            <p>{t("moonset")}</p>
                                            <p className='moon-phase-text-info'>{weatherForecast? weatherForecast.forecast.forecastday[0].astro.moonset.slice(0, 5) : " -- "}</p>
                                        </div>                                    
                                    </div>
                                    <div className='moon-phase-img'>
                                        {weatherForecast? <img src={moonPhases()} alt="moon" /> : ""}
                                    </div>
                            </div>       
                        
                        </div>

                        <div className='weather-container'>
                            <div className='weather-box weather-box-night'>
                                <div className='weather-condition-small'>
                                    <img src={iconConfig.weatherWatch} alt="icon" />
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
                                    <img src={iconConfig.weatherWatch} alt="icon" />
                                    <p>{t("precipitation")}</p>
                                </div>
                                
                                <h2>
                                {weatherForecast ? ((weatherForecast.current.precip_mm / 10).toFixed(2) + " cm") : "0"}
                                </h2>
                                
                                    <p className='font-size-2'>
                                    {weatherForecast ? ((weatherForecast.forecast.forecastday[0].day.totalprecip_mm / 10).toFixed(2) + t("precipitationToday")) : "--"}
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