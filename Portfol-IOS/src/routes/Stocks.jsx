import React, { useState, useEffect} from 'react'
import Header from '../components/Header'
import '../styles/stocks.css'
import iconConfig from '../components/iconConfig'
import axios from 'axios'
import HomeButton from '../components/HomeButton'
import { useTranslation } from 'react-i18next'
const Stocks = () => {
    const [stocks, setStocks] = useState([])
    const [loading, setLoading] = useState(true)
    const { t } = useTranslation();

    const currentDate = new Date();
    const monthName = currentDate.toLocaleString('en', { month: 'long' });
    const day = currentDate.getDate();
    const translatedMonthName = t(monthName); 
    console.log("translatedMonthName ==>", translatedMonthName);
    console.log("monthName ==>", monthName);

    const formattedDate = `${day} ${translatedMonthName}`;

     
    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-USD,BTC-BRL,ETH-USD,ETH-USD,ETH-BRL');
                if (response.status === 200) {
                    setStocks(response.data);
                    console.log("response ==>", response.data);
                    setLoading(false);
                } else {
                    console.log("Erro ao buscar stocks: " + response.statusText);
                    setLoading(false);
                }
            } catch (err) {
                console.log("Erro ao buscar stocks: " + err);
                setLoading(false);
            }
        }

       fetchStocks();
    }, [])



    return ( 
        <div className='container-calculator'>
            <div>
                <div className="screen ">
                    <Header />
                    <div className='stocks-header'>
                        <div>
                            <h3>{t("stocks")}</h3>
                            <h4>{formattedDate}</h4>
                        </div>
                        <div>
                            <img src={iconConfig.more} alt="" />
                        </div>
                    </div>
                    <div className='stocks-input-box'>
                        <input className='stocks-input' type="text" placeholder={t("search")} />
                    </div>

                    <div className='stocks-container'>

                       

                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            Object.keys(stocks).map((key, index) => (
                                <div key={index} className='stocks-box'>
                                    <div>
                                        <h3>{stocks[key].code}/{stocks[key].codein}</h3>
                                        <p>{t(`${stocks[key].code}/${stocks[key].codein}`)}</p>
                                    </div>
                                    <div className='stocks-price'>
                                    <h3>{parseFloat(stocks[key].bid).toFixed(2)}</h3>
                                    <h4 className={stocks[key].pctChange > 0 ? 'stocks-positive' : 'stocks-negative'}>{parseFloat(stocks[key].pctChange).toFixed(2)}%</h4>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <HomeButton />
                </div>
            </div>
            
        
        </div>
     );
}
 
export default Stocks;