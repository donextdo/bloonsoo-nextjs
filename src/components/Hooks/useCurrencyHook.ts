import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RootState } from "../../../stores/store";
import { useSelector } from "react-redux";
import axios from "axios";

const useCurrency = () => {
  const [currency, setCurrency] = useState("USD");
  const [rates, setRates] = useState(null);
  const currencyState = useSelector(
    (state: RootState) => state.currencychange.currency
  );
  const [exchangeRates, setExchangeRates] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://openexchangerates.org/api/latest.json?app_id=2e7189d466e040b9bd69705aa964bc29`
      )
      .then((response) => {
        setRates(response.data.rates);
        console.log(response.data.rates);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currencyState]);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      const sessionCurrency = sessionStorage.getItem("currency");
      if (sessionCurrency !== null) {
        setCurrency(sessionCurrency);
      } else {
        setCurrency("USD");
      }
    }
  }, [currencyState]);

  useEffect(() => {
    if (rates) {
      setExchangeRates(rates[currency]);
    }
  }, [currency, rates]);
 

  const getPrice = (price: number) => {
   
    const convertedPrice = currency === "USD" ? price : price * exchangeRates;

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    });
    return formatter.format(convertedPrice);
  };

  console.log(exchangeRates)

  return { getPrice };
};

export default useCurrency;
