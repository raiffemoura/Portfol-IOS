import React from 'react';
import Header from '../components/Header';
import CalculatorBtn from '../components/CalculatorBtn';
import "../styles/calculator.css";



const Calculator = () => {
    return ( 
        <div className='container-calculator'>
            <div>
                <div className="screen">
                    <Header />
                    <CalculatorBtn />
                    
                </div>
            </div>
            
        </div>
     );
}
 
export default Calculator;