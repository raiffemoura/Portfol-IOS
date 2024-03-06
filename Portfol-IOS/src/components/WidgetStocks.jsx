import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function WidgetStocks() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(
          "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,USD-EUR"
        );
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
    };

    fetchStocks();
  }, []);
  return (
    <div className="stocks-widget">
      {loading ? (
        <p>Loading...</p>
      ) : (
        Object.keys(stocks).map((key, index) => (
          <div key={index} className="stocks-box-widget">
            <div className="stocks-name-widget">
              <h5>
                {stocks[key].code}/{stocks[key].codein}
              </h5>
              <p>{t(`${stocks[key].code}/${stocks[key].codein}`)}</p>
            </div>
            <div className="stocks-price-widget">
              <p>{parseFloat(stocks[key].bid).toFixed(2)}</p>
              <p
                className={
                  stocks[key].pctChange > 0
                    ? "stocks-positive-widget"
                    : "stocks-negative-widget"
                }
              >
                {parseFloat(stocks[key].pctChange).toFixed(2)}%
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
