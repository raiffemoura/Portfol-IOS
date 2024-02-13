import React, { useState, useEffect} from 'react'
import Header from '../components/Header'
import '../styles/stocks.css'
import iconConfig from '../components/iconConfig'
import axios from 'axios'
const Stocks = () => {
    const [stocks, setStocks] = useState([])

    const currentDate = new Date();
    const monthName = currentDate.toLocaleString('EN', { month: 'long' });
    const day = currentDate.getDate();
    const formattedDate = `${day} ${monthName}`;

     
    useEffect(() => {
        axios.get('https://economia.awesomeapi.com.br/last/USD-BRL')
        .then(response => {
            setStocks(response.data)
            console.log("stocks ==" + stocks);
        })
    }, [])
    console.log("stocks ==" + stocks);

    return ( 
        <div className='container-calculator'>
            <div>
                <div className="screen ">
                    <Header />
                    <div className='stocks-header'>
                        <div>
                            <h3>Stocks</h3>
                            <h4>{formattedDate}</h4>
                        </div>
                        <div>
                            <img src={iconConfig.more} alt="" />
                        </div>
                    </div>
                    <div className='stocks-input-box'>
                        <input className='stocks-input' type="text" placeholder='Search' />
                    </div>

                    <div className='stocks-container'>

                        <div className='stocks-box'>
                            <div>
                                <h3>USD-BRL</h3>
                                <p>DOLAR</p>
                            </div>
                            <div>
                                <h4>1.000,00</h4>
                            </div>
                        </div>
                        <div className='stocks-box'>
                            <div>
                                <h3>EUR-BRL</h3>
                                <p>EURO</p>
                            </div>
                            <div>
                                <h4>1.000,00</h4>
                            </div>
                        </div>

                        <div className='stocks-box'>
                            <div>
                                <h3>BTC-USD</h3>
                                <p>Bitcoin USD</p>
                            </div>
                            <div>
                                <h4>1.000,00</h4>
                            </div>
                        </div>

                        <div className='stocks-box'>
                            <div>
                                <h3>BTC-BRL</h3>
                                <p>Bitcoin BRL</p>
                            </div>
                            <div>
                                <h4>1.000,00</h4>
                            </div>
                        </div>

                        <div className='stocks-box'>
                            <div>
                                <h3>ETH-USD</h3>
                                <p>Etherium USD</p>
                            </div>
                            <div>
                                <h4>1.000,00</h4>
                            </div>
                        </div>

                        <div className='stocks-box'>
                            <div>
                                <h3>ETH-BRL</h3>
                                <p>Etherium BRL</p>
                            </div>
                            <div>
                                <h4>1.000,00</h4>
                            </div>
                        </div>

                    </div>





                </div>
            </div>
            
        
        </div>
     );
}
 
export default Stocks;