import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import iconConfig from "./iconConfig";

export default function WidgetBinance() {
  const [cripto, setCripto] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCripto = async () => {
      try {
        const response = await axios.get(
          "https://economia.awesomeapi.com.br/last/BTC-USD,ETH-USD,BTC-BRL"
        );
        if (response.status === 200) {
          setCripto(response.data);
          console.log("response ==>", response.data);
          setLoading(false);
        } else {
          console.log("Erro ao buscar Cripto: " + response.statusText);
          setLoading(false);
        }
      } catch (err) {
        console.log("Erro ao buscar Cripto: " + err);
        setLoading(false);
      }
    };

    fetchCripto();
  }, []);
  return (
    <div className="cripto-widget">
      {loading ? (
        <p>Loading...</p>
      ) : (
        Object.keys(cripto).map((key, index) => (
          <div key={index} className="cripto-box-widget">
            <div className="cripto-name-widget">
              <div className="cripto-img-widget">
                <img
                  src={
                    cripto[key].code === "BTC" ? iconConfig.btc : iconConfig.eth
                  }
                  alt="cripto"
                />
              </div>
              <div>
                <h5>{cripto[key].code}</h5>
                <p>{cripto[key].code === "BTC" ? "Bitcoin" : "Ethereum"}</p>
              </div>
            </div>
            <div className="cripto-price-widget">
              <p>{parseFloat(cripto[key].bid).toFixed(2)}</p>
              <p
                id={
                  cripto[key].pctChange > 0
                    ? "cripto-positive-widget"
                    : "cripto-negative-widget"
                }
              >
                {parseFloat(cripto[key].pctChange).toFixed(2)}%
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
