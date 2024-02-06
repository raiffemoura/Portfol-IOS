import React from 'react';
import { Link } from "react-router-dom";
const HomeButtonSpotify = () => {
    return ( 
        <div className="home-button-sticky">
            <Link to={"/"}><button className="back-btn"> </button></Link>
        </div>
     );
}
 
export default HomeButtonSpotify;