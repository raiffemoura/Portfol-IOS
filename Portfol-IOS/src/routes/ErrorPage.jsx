import React from 'react';
import Header from '../components/Header';
import BoxError from '../components/BoxError';
import "../styles/404.css";



const ErrorPage = () => {
    return ( 
        <div className='container404'>
            <div>
                <div className="screen">
                    <Header />
                    <BoxError/>                    
                </div>
            </div>
            
        </div>
        
     );
}
 
export default ErrorPage;