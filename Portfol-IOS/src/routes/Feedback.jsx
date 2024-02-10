import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import HeaderBlack from '../components/HeaderBlack'
import '../styles/feedback.css'
import axios from 'axios';
import iconConfig from '../components/iconConfig';
const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [expandedFeedback, setExpandedFeedback] = useState(false);
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/feedbacks');
                console.log("Response data:", response.data); 
                console.log("Type of feedbacks:", typeof feedbacks);
                setFeedbacks(response.data);
                console.log("Feedbacks:", feedbacks);
            } catch (err) {
                console.log("Erro ao buscar feedbacks: "+err);
            }
        };
        fetchFeedbacks();
        
    }, [])

 
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
                        <Link to={"/"}> <img src={iconConfig.arrowBackBlue} alt="back" /></Link>
                        <img id='feedback-logo' src={iconConfig.feedbackLogo} alt="logo" />
                        <Link to ={'/thanks-for-your-feedback'}><img src={iconConfig.addFeedback} alt="add-feedback" /></Link>
                    </div>

                    <div className='feedback-container'>
                        
                        {feedbacks.map(feedback => (
                            <div key={feedback._id} className='feedback-box colorA'>
                                <div className='feedback-box-header'>
                                <h3>{limitString(feedback.name, 15)}</h3>
                                    <h6>{feedback.date}</h6>
                                </div>
                                <div className='feedback-box-text'>
                                    <p>
                                        {limitString(feedback.description, 80)}
                                    </p>
                                </div>
                            </div>
                            ))}
                            
                            
                      
                    </div>
                </div>
            </div>
            
        
        </div>
    );
}
 
export default Feedback;