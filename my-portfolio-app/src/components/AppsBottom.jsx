import React from 'react';
import { Link } from 'react-router-dom';

import safari from '../assets/apps/safari.png';
import messages from '../assets/apps/messages.png';
import whats from '../assets/apps/whats.png';
import phone from '../assets/apps/phone.png';
const AppsBottom = () => {
    function apps(app){
        return(
                <div className='img-hover'>
                    <img src={app} alt="{app}" /> 
                </div>
            
        )
    }
    return (
        <div className='apps-bottom'>
            <div className='apps-line'> 
                {apps(safari, "Safari")}
                {apps(messages, "Messages")}
                <Link target='_blank' to={"http://wa.link/mbcvl1"}>
                    {apps(whats, "Whatsapp")}
                </Link>
                <Link to={"/Phone"}>
                    {apps(phone, "Phone")}
                </Link>
       
            </div>
        </div>
       )     
}
 
export default AppsBottom;