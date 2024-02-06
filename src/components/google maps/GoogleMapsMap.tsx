import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox, DirectionsService, DirectionsRenderer, Marker } from "@react-google-maps/api";
import { Link } from 'react-router-dom';
import iconConfig from '../iconConfig.js'
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
    
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const userLatitude = position.coords.latitude;
                const userLongitude = position.coords.longitude;
                setMapPosition({ lat: userLatitude, lng: userLongitude });
            });
        }
    }, []);

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

    const onKeyPressA = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const places = searchBoxA.getPlaces();
            if (places && places.length > 0) {
                const place = places[0];
                const location = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setPointA(location);
                setOrigin(null);
                setDestination(null);
                map?.panTo(location);
                map?.setCenter(location);
                setMapPosition(location);
                setMarkerA(location);
            }
        }
    };

    const onKeyPressB = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const places = searchBoxB.getPlaces();
            if (places && places.length > 0) {
                const place = places[0];
                const location = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setPointB(location);
                setOrigin(null);
                setDestination(null);
                map?.panTo(location);
                map?.setCenter(location);
                setMapPosition(location);
                setMarkerB(location);
            }
        }
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

    return (
      <div> 
        <div className='map-header'>
            <div className='map-header-icon-start'>
            <Link to={"/"}> <img id='arrow-back' src={iconConfig.arrowBackBlack} alt='arrow'/> </Link>
            <img id='location-icon' src={iconConfig.locationImg} alt="location" /> 

        </div>
        {mapLoaded && (
            <div className="address">
            <StandaloneSearchBox
                onLoad={onLoadA}
                onPlacesChanged={onPlacesChangedA}
            >
                <input
                    className="addressField"
                    placeholder="Your location"
                    value={inputValueA}
                    onChange={(e) => setInputValueA(e.target.value)}
                    onkeydown={handleEnterKeyPress}
                />
            </StandaloneSearchBox>
            <StandaloneSearchBox
                onLoad={onLoadB}
                onPlacesChanged={onPlacesChangedB}
            >
                <input
                    className="addressField"
                    placeholder="Choose destination"
                    value={inputValueB}
                    onChange={(e) => setInputValueB(e.target.value)}
                    onKeyDown={handleEnterKeyPress}
                />
      </StandaloneSearchBox>

        </div>
        )}
        <div className='map-header-icon-end'>
            <button><img id='more-icon' src={iconConfig.moreIcon} alt="more"  /></button>

            <button><img id="switch-icon" src={iconConfig.switchIcon} alt="switch" /></button>
        </div>
    </div >
        

    <div className='map-transport-container '
      ref={itemsRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}>
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


              {/* ================================== MAP ===================================== */}


            <div className="map">
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
                        {/* <div className="address">
                            <StandaloneSearchBox
                                onLoad={onLoadA}
                                onPlacesChanged={onPlacesChangedA}
                            >
                                <input
                                    className="addressField"
                                    placeholder="Your location"
                                    value={inputValueA}
                                    onChange={(e) => setInputValueA(e.target.value)}
                                    onkeydown={handleEnterKeyPress}
                                />
                            </StandaloneSearchBox>
                            <StandaloneSearchBox
                                onLoad={onLoadB}
                                onPlacesChanged={onPlacesChangedB}
                            >
                                <input
                                    className="addressField"
                                    placeholder="Choose destination"
                                    value={inputValueB}
                                    onChange={(e) => setInputValueB(e.target.value)}
                                    onKeyDown={handleEnterKeyPress}
                                />
                      </StandaloneSearchBox>
                        </div> */}

                        {markerA && <Marker position={markerA} />}
                        {markerB && <Marker position={markerB} />}

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

            <div className='map-footer-info'>
                {distance !== null && duration !== null && (
                    <div className='route-info'>
                        <h1>{duration} ({distance})</h1> 
                        <p>Fastest route now due to traffic conditions</p>
                    </div>
                )}
                <div className='footer-btns'>
                    <button className='footer-btn-selected' onClick={traceRoute}>
                        <img src={iconConfig.startNavigate} alt="navigate" />
                        Directions 
                    </button>
                </div>  
            </div>
        </div>
    );
};

export default GoogleMapsMap;