import React from 'react';
// import GoogleMapsHeader from './GoogleMapsHeader.jsx';
import HomeButtonMaps from '../HomeButtonMaps.jsx'
import GoogleMapsMap from './GoogleMapsMap.tsx'
// import GoogleMapsFooter from './GoogleMapsFooter.jsx';
// import GoogleMapsTransports from './GoogleMapsTransports.jsx'





const GoogleMapsPage = () => {
    return ( 
        <div className='maps-screen'>
            
           
            {/* <GoogleMapsHeader /> */}
            {/* <GoogleMapsTransports /> */}
            <GoogleMapsMap />
            {/* <GoogleMapsFooter/> */}
            <HomeButtonMaps />
        </div>
     );
}
 
export default GoogleMapsPage;