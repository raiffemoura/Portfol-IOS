import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox, DirectionsService, DirectionsRenderer, Marker } from "@react-google-maps/api";
import { Link } from 'react-router-dom';
import iconConfig from '../iconConfig.js'
import { useTranslation } from 'react-i18next'
const libraries = ["places"];

const GoogleMapsMap = () => {
    const REACT_APP_GOOGLE_MAPS_API_KEY = "AIzaSyACW1wSY6n-H336x5tcVbuAmV1OYIh47o4";


    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [searchBoxA, setSearchBoxA] = useState<google.maps.places.SearchBox>();
    const [searchBoxB, setSearchBoxB] = useState<google.maps.places.SearchBox>();
    const [pointA, setPointA] = useState<google.maps.LatLngLiteral>();
    const [pointB, setPointB] = useState<google.maps.LatLngLiteral>(); 
    const [mapPosition, setMapPosition] = useState({ lat: -7.148412839525442, lng: -34.79654509078193 });
    const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
    const [destination, setDestination] = useState<google.maps.LatLngLiteral | null>(null);
    const [response, setResponse] = useState<google.maps.DistanceMatrixResponse | null>(null);
    const [searchBoxALoaded, setSearchBoxALoaded] = useState(false);
    const [searchBoxBLoaded, setSearchBoxBLoaded] = useState(false);
    const [inputValueA, setInputValueA] = useState('');
    const [inputValueB, setInputValueB] = useState('');
    const [markerA, setMarkerA] = useState(null);
    const [markerB, setMarkerB] = useState(null);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState("--");
    const itemsRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [selectedTransport, setSelectedTransport] = useState('DRIVING');
    const [mapLoaded, setMapLoaded] = useState(false);

    const { t } = useTranslation();
    // Hook useEffect para obter a localização atual do usuário ao carregar o componente.    
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const userLatitude = position.coords.latitude;
                const userLongitude = position.coords.longitude;
                setMapPosition({ lat: userLatitude, lng: userLongitude });
            });
        }
    }, []);
    // Função para carregar o mapa quando estiver pronto.
    const onMapLoad = (map: google.maps.Map) => {
        setMap(map);
    };
    
    const onLoadA = (ref: google.maps.places.SearchBox) => {
      setSearchBoxA(ref);
      setSearchBoxALoaded(true);
  };
      
    const onLoadB = (ref: google.maps.places.SearchBox) => {
        setSearchBoxB(ref);
        setSearchBoxBLoaded(true);
    };
    useEffect(() => {
        if (searchBoxALoaded && searchBoxBLoaded) {
            window.addEventListener('keydown', handleEnterKeyPress);
            return () => {
                window.removeEventListener('keydown', handleEnterKeyPress);
            };
        }
        // eslint-disable-next-line
  }, [searchBoxALoaded, searchBoxBLoaded]);

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        traceRoute();
        if (inputValueA && inputValueB) {
            setInputValueB('');
        }
    }
};

    const onPlacesChangedA = () => {
    if (searchBoxA) {
        const places = searchBoxA.getPlaces();
        const place = places && places.length > 0 ? places[0] : null;
        if (place) {
            const location = {
                lat: place.geometry?.location?.lat() || 0,
                lng: place.geometry?.location?.lng() || 0,
            };
            setPointA(location);
            setOrigin(null);
            setDestination(null);
            map?.panTo(location);
            map?.setCenter(location);
            setMapPosition(location);
            setMarkerA(location);
            setInputValueA(place.formatted_address || '');
        }
    }
    };

    const onPlacesChangedB = () => {
    if (searchBoxB) {
        const places = searchBoxB.getPlaces();
        const place = places && places.length > 0 ? places[0] : null;
        if (place) {
            const location = {
                lat: place.geometry?.location?.lat() || 0,
                lng: place.geometry?.location?.lng() || 0,
            };
            setPointB(location);
            setOrigin(null);
            setDestination(null);
            map?.panTo(location);
            map?.setCenter(location);
            setMapPosition(location);
            setMarkerB(location);
            setInputValueB(place.formatted_address || '');
        }
    }
    };

    const traceRoute = () => {
        if (pointA && pointB) {
            setOrigin(pointA);
            setDestination(pointB);
        }
        setMarkerA(null);
        setMarkerB(null);
    };

    const directionsServiceOptions = React.useMemo<google.maps.DirectionsRequest>(() => {
        return {
            origin,
            destination,
            travelMode: selectedTransport,
        };
    }, [origin, destination, selectedTransport]);

    const directionsCallback = React.useCallback((res) => {
        if (res !== null && res.status === "OK") {
            setResponse(res);
            setDistance(res.routes[0].legs[0].distance.text);            
            setDuration(res.routes[0].legs[0].duration.text); 
          
        
        } else {
            console.log(res);
        }
    }, []);

    const directionsRendererOptions = React.useMemo<google.maps.DirectionsRendererOptions>(() => {
        return {
            directions: response,
        };
    }, [response]);

    const handleTransportSelect = (transport) => {
        setSelectedTransport(transport);
        if (transport === "taxi" || transport === "airplane") {
            setDistance("--");
            setDuration("--");
        }
        console.log("Transporte selecionado:", transport);
        traceRoute();
    };

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setStartX(e.pageX - itemsRef.current.offsetLeft);
        setScrollLeft(itemsRef.current.scrollLeft);
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
        const x = e.pageX - itemsRef.current.offsetLeft;
        const walk = (x - startX) * 1;
        itemsRef.current.scrollLeft = scrollLeft - walk;
    };

    const translateTime = (time) => {
        if (localStorage.getItem('language') === 'EN') {
            time = time.replace(/\bminutos\b/g, "minutes");
            time = time.replace(/\bhora\b/g, "hour");
            time = time.replace(/\bhoras\b/g, "hours");

            return time;
        } else {
            return time
        }
            
    }

    return (
      <div> 
            {/* Estrutura do cabeçalho */}
        <div className='map-header'>
            <div className='map-header-icon-start'>
            <Link to={"/"}> <img id='arrow-back' src={iconConfig.arrowBackBlack} alt='arrow'/> </Link>
            <img id='location-icon' src={iconConfig.locationImg} alt="location" /> 

        </div>
            {/* Componentes de pesquisa de endereço */}
        {mapLoaded && (
            <div className="address">
                {/* Componentes StandaloneSearchBox para os locais A e B */}

            <StandaloneSearchBox
                onLoad={onLoadA}
                onPlacesChanged={onPlacesChangedA}
            >
                <input
                    className="addressField"
                    placeholder={t("yourLocation")}
                    value={inputValueA}
                    onChange={(e) => setInputValueA(e.target.value)}
                    onKeyDown={handleEnterKeyPress}
                />
            </StandaloneSearchBox>
            <StandaloneSearchBox
                onLoad={onLoadB}
                onPlacesChanged={onPlacesChangedB}
            >
                <input
                    className="addressField"
                    placeholder={t("yourDestination")}                    
                    value={inputValueB}
                    onChange={(e) => setInputValueB(e.target.value)}
                    onKeyDown={handleEnterKeyPress}
                />
      </StandaloneSearchBox>

        </div>
        )}
            {/* Ícones no final do cabeçalho */}
        <div className='map-header-icon-end'>
            <button><img id='more-icon' src={iconConfig.moreIcon} alt="more"  /></button>

            <button><img id="switch-icon" src={iconConfig.switchIcon} alt="switch" /></button>
        </div>
    </div >
        
            {/* Contêiner para os modos de transporte */}
    <div className='map-transport-container '
      ref={itemsRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}>
                {/* Botões para selecionar os modos de transporte */}
          <button onClick={() => handleTransportSelect('DRIVING')} className={selectedTransport === 'DRIVING' ? 'map-transport-selected' : 'map-transport'}>
          <img src={selectedTransport === 'DRIVING' ? iconConfig.carIcon : iconConfig.carIconBlack} alt="" />
              <p>{selectedTransport === 'DRIVING' ? duration : '--' }</p>
          </button>
          <button onClick={() => handleTransportSelect('TRANSIT')} className={selectedTransport === 'TRANSIT' ? 'map-transport-selected' : 'map-transport'}>
          <img src={selectedTransport === 'TRANSIT' ? iconConfig.trainIcon : iconConfig.trainIconBlack} alt="" />
              <p> {selectedTransport === 'TRANSIT' ? duration : '--'} </p>
          </button>
          <button onClick={() => handleTransportSelect('WALKING')} className={selectedTransport === 'WALKING' ? 'map-transport-selected' : 'map-transport'}>
          <img src={selectedTransport === 'WALKING' ? iconConfig.walkIcon : iconConfig.walkIconBlack} alt="" />
              <p> {selectedTransport === 'WALKING' ? duration : '--'} </p>
          </button>
          <button onClick={() => handleTransportSelect('taxi')} className={selectedTransport === 'taxi' ? 'map-transport-selected' : 'map-transport'}>
          <img src={selectedTransport === 'taxi' ? iconConfig.taxiIcon : iconConfig.taxiIconBlack} alt="" />
              <p> -- </p>
          </button>
          <button onClick={() => handleTransportSelect('BICYCLING')} className={selectedTransport === 'BICYCLING' ? 'map-transport-selected' : 'map-transport'}>
          <img src={selectedTransport === 'BICYCLING' ? iconConfig.bikeIcon : iconConfig.bikeIconBlack} alt="" />
              <p> {selectedTransport === 'BICYCLING' ? duration : '--'} </p>
          </button>
          <button onClick={() => handleTransportSelect('airplane')} className={selectedTransport === 'airplane' ? 'map-transport-selected' : 'map-transport'}>
          <img src={selectedTransport === 'airplane' ? iconConfig.airplaneIcon : iconConfig.airplaneIconBlack} alt="" />
              <p> -- </p>
          </button>
                 


            
                  
              </div>


            {/* Mapa renderizado */}


            <div className="map">
                {/* Componente LoadScript para carregar a API do Google Maps */}
                <LoadScript
                    googleMapsApiKey={REACT_APP_GOOGLE_MAPS_API_KEY}
                    libraries={libraries}
                    onLoad={() =>setMapLoaded(true)}
                    onError={(error) => console.error('Erro ao carregar a API do Google Maps', error)}
                >
                    
                    <GoogleMap
                        onLoad={onMapLoad}
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        center={mapPosition}
                        zoom={14}
                    >
                    {/* Componentes Marker para os pontos A e B */}

                        {markerA && <Marker position={markerA} />}
                        {markerB && <Marker position={markerB} />}
                    {/* Componentes DirectionsService e DirectionsRenderer para traçar a rota */}
                        {origin && destination && (
                            <DirectionsService
                                options={directionsServiceOptions}
                                callback={directionsCallback}
                            />
                        )}

                        {response && directionsRendererOptions && (
                            <DirectionsRenderer options={directionsRendererOptions} />
                        )}
                    </GoogleMap>
                </LoadScript>
            </div>
            {/* Informações sobre a rota */}
            <div className='map-footer-info'>
                {/* Informações sobre a distância e duração da rota */}
                {distance !== null && duration !== null && (                   
                    <div className='route-info'>
                    {/* Tempo de duração e distância */}
                    <h1>{duration? translateTime(duration) : ""} ({distance})</h1> 
                        <p>{t("fastestRoute")}</p>
                    </div>
                )}
                {/* Botão para iniciar a navegação */}
                <div className='footer-btns'>
                    {/* Botão de navegação */}
                    <button className='footer-btn-selected' onClick={traceRoute}>
                        <img src={iconConfig.startNavigate} alt="navigate" />
                        {t("directions")} 
                    </button>
                </div>  
            </div>
        </div>
    );
};

export default GoogleMapsMap;