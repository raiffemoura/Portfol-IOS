import React from 'react'
import step from '../../assets/icons/step.png';
import pin from '../../assets/icons/pin.png';
const GoogleMapsFooter = () => {
    return ( <div className='map-footer-info'>
    <h1>1 min (1.5 km)</h1> 
    <p>Fastest route now due to traffic conditions</p>
    <div className='footer-btns'>
        {/* <button className='footer-btn-selected'> 
        <img src={startNavigate} alt="navigate" />
        Start </button> */}

        <button className='footer-btn'>
            <img src={step} alt="steps"  />
            Steps</button> 
        <button className='footer-btn'>
            <img src={pin} alt="pin"  />
            Pin </button>
</div>  

</div> );
}
 
export default GoogleMapsFooter;