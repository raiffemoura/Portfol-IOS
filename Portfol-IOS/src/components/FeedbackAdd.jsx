import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import HeaderBlack from '../components/HeaderBlack'
import '../styles/feedback.css'
import axios from 'axios';
import iconConfig from './iconConfig';

const Feedback = () => {
 
    const limitString = (string, limit) => {
        if (string.length > limit) {
            return string.substring(0, limit) + '...';
        } 
        return string;
        }
    

    return (
        

        <div className='container-feedback'>
            <div>
                <div className="screen ">
                    <HeaderBlack />
                    <div className='feedback-header'>
                        <Link to={"/"}><img src={iconConfig.arrowBackBlue} alt="arrow-back-blue" /></Link>
                        <img id='feedback-logo' src={iconConfig.feedbackLogo} alt="logo" />
                        <Link to={"/feedback"}><img src={iconConfig.closefeedback} alt="close-feedback" /></Link>

                    </div>

                    <div className='feedback-person tblack'>
                        <div>
                            <h3>Raiffe Moura</h3>
                            <p>Full Strack Developer</p>
                        </div>
                        <img src={iconConfig.avatar} alt="person" />

                    </div>

                    <div className='feedback-questions tblack'>
                        <div className='feedback-question'>
                            <h3>--How was your experience?</h3>
                            <div className='feedback-rating'>
                                <img src={iconConfig.feedbackA} alt="add-feedback" />
                                <img src={iconConfig.feedbackB} alt="add-feedback" />
                                <img src={iconConfig.feedbackC} alt="add-feedback" />
                            </div>
                        </div>
                        
                        
                    </div>

                    <div className='feedback-textarea tblack'>
                        <h3>What can we improve?</h3>
                        <textarea placeholder='Enter your honest feedback here'>

                        </textarea>
                    </div>


                    
                </div>
            </div>
            
        
        </div>
    );
}
 
export default Feedback;