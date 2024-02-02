import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox, DirectionsService, DirectionsRenderer, Marker } from "@react-google-maps/api";
import iconConfig from './iconConfig';



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
    const [markerA, setMarkerA] = useState(null);
    const [markerB, setMarkerB] = useState(null);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState("--");
    const itemsRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [selectedTransport, setSelectedTransport] = useState('DRIVING');
    
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const userLatitude = position.coords.latitude;
                const userLongitude = position.coords.longitude;
                setMapPosition({ lat: userLatitude, lng: userLongitude });
            });
        }
    }, []);

   


    
  
    
  

          {/* ================================== FUNCTIONS MAP ===================================== */}

        

          const onMapLoad = (map: google.maps.Map) => {
            setMap(map);
        };
        
        const onLoadA = (ref: google.maps.places.SearchBox) => {
            setSearchBoxA(ref);
        };
        
        const onLoadB = (ref: google.maps.places.SearchBox) => {
            setSearchBoxB(ref);
        };
    
        const onPlacesChangedA = () => {
            const places = searchBoxA.getPlaces();
            const place = places![0];
            const location = {
                lat: place?.geometry?.location?.lat() || 0,
                lng: place?.geometry?.location?.lng() || 0,
            };
            setPointA(location);
            setOrigin(null);
            setDestination(null);
            map?.panTo(location);
            map?.setCenter(location);
            setMapPosition(location);
            setMarkerA(location);
        }
        
        const onPlacesChangedB = () => {
            const places = searchBoxB.getPlaces();
            const place = places![0];
            const location = {
                lat: place?.geometry?.location?.lat() || 0,
                lng: place?.geometry?.location?.lng() || 0,
            };
            setPointB(location);
            setOrigin(null);
            setDestination(null);
            map?.panTo(location);
            map?.setCenter(location);
            setMapPosition(location);
            setMarkerB(location);
        }
    
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
        // @ts-ignore
        const directionsRendererOptions = React.useMemo<google.maps.DirectionsRendererOptions>(() => {
          return {
            directions: response,
        };
    }, [response]);

      

      {/* ================================== FUNCTIONS TRANSPORT ===================================== */}


      const handleTransportSelect = (transport) => {
        setSelectedTransport(transport);
        if (transport === "taxi" || transport === "airplane") {
            setDistance("--");
            setDuration("--");
        }
        console.log("Transporte selecionado:", transport);
        traceRoute();
    }

   

    const handleMouseDown = (e) => {
      setIsMouseDown(true);
      // @ts-ignore
      setStartX(e.pageX - itemsRef.current.offsetLeft);
      // @ts-ignore
      setScrollLeft(itemsRef.current.scrollLeft);
  }
    const handleMouseLeave = () => {
        setIsMouseDown(false);
    }
    const handleMouseUp = () => {
        setIsMouseDown(false);
    }
    const handleMouseMove = (e) => {
        if(!isMouseDown) return;
        e.preventDefault();
        // @ts-ignore
        const x = e.pageX - itemsRef.current.offsetLeft;
        const walk = (x - startX) * 1; //adjust the speed
        // @ts-ignore
        itemsRef.current.scrollLeft = scrollLeft - walk;
    }
      {/* ================================== TRANSPORT ===================================== */}

        return (
        <div> 


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
            // @ts-ignore
        libraries={libraries}
        onLoad={() => console.log('API do Google Maps carregada com sucesso')}
        onError={(error) => console.error('Erro ao carregar a API do Google Maps', error)}
      >
        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={mapPosition}
          zoom={14}
        >
          <div className="address">
            <StandaloneSearchBox
              onLoad={onLoadA}
              onPlacesChanged={onPlacesChangedA}
            >
              <input
                className="addressField"
                placeholder="Your location"
              />
            </StandaloneSearchBox>
            <StandaloneSearchBox
              onLoad={onLoadB}
              onPlacesChanged={onPlacesChangedB}
            >
              <input
                className="addressField"
                placeholder="Choose destination"
              />
            </StandaloneSearchBox>
           
          </div>
        





          {markerA && <Marker position={markerA} />}
          {markerB && <Marker position={markerB} />}
          

          {origin && destination && (
            <DirectionsService
              options={directionsServiceOptions}
              callback={directionsCallback}
            />
          )}


         
          
          {response && directionsRendererOptions && (
            <DirectionsRenderer options={directionsRendererOptions} 
            />
          )}
        </GoogleMap>
      </LoadScript>

      
    </div>
      {/* ================================== FOOTER ===================================== */}
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
              Directions </button>
          

       
</div>  

</div>
    </div>
  );
};
 
export default GoogleMapsMap;