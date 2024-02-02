import React from 'react';
import Header from '../components/Header';
import CalculatorBtn from '../components/CalculatorBtn';


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