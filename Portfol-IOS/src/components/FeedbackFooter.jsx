import React from 'react'
import { Link } from 'react-router-dom'
import iconConfig from './iconConfig'

const FeedbackFooter = () => {
    return ( 
        <div className='tblack feedback-footer'>

                <div className='feedback-footer-icons'>
                    <Link to={"/feedback"}><img src={iconConfig.feedbackHome} alt="home" /></Link>
                    <Link to={"/feedback"}><p>Home</p></Link>
                </div>
                <div className='feedback-footer-icons'>
                    <Link to={"/statistics"}><img src={iconConfig.statistics} alt="statistics" /></Link>
                    <Link to={"/statistics"}><p>Statistics</p></Link>
                </div>

            </div>
     );
}
 
export default FeedbackFooter;