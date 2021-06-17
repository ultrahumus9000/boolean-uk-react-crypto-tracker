import { useEffect, useState } from "react";
import { updatePrice } from "../constants";

// This function give us the current time in seconds
function currentTime() {
  return Math.round(Date.now() / 1000);
}

/*
  Use this function with the updated_at timestamp you get from each coin item in the API response
 */
function convertToSeconds(dateValue) {
  // This guard is needed due to the API discrepancies in handling dates
  return typeof dateValue === "string"
    ? Math.round(Date.parse(dateValue) / 1000)
    : dateValue;
}

export default function MainDetail({
  selectedCripto,
  crypotoCurrencyList,
  setCrypotoCurrencyList,
}) {
  const { symbol, current_price, last_updated } = crypotoCurrencyList.find(
    (item) => item.id === selectedCripto
  );

  const [timeDifference, settimeDifference] = useState(
    currentTime() - convertToSeconds(last_updated)
  );

  const [countDown, setCountDown] = useState(5);
  const [currentPriceObj, setCurrentPriceObj] = useState({});

  console.log(
    "date that i want to want to fetch",
    currentPriceObj.last_updated_at
  );
  useEffect(() => {
    let intervalId = setInterval(() => {
      settimeDifference(currentTime() - convertToSeconds(last_updated));
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let intervalId = setInterval(() => {
      setCountDown((countDown) => {
        if (countDown > 0) {
          return countDown - 1;
        } else {
          return 5;
        }
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (countDown === 0) {
      updatePrice(selectedCripto).then((currentPriceFromServer) => {
        let upodatedCurrentPriceObj = currentPriceFromServer[selectedCripto];
        //no need spread cuz we want to replace completely
        let filteredList = crypotoCurrencyList.map((item) => {
          if (item.id === selectedCripto) {
            item = {
              ...item,
              current_price: upodatedCurrentPriceObj.gbp,
              last_updated: upodatedCurrentPriceObj.last_updated_at,
            };
          }
          return item;
        });
        setCrypotoCurrencyList(filteredList);
      });
    }
  }, [countDown]);

  return (
    <>
      <section className="main-detail__central">
        <div className="main-detail__update">
          <p>next update in {countDown}</p>
          <button className="main-detail__button" onClick={() => {}}>
            Start update
          </button>
        </div>
        <div className="main-detail__name">
          <h2>{selectedCripto}</h2>
          <p>
            <span className="small">a.k.a </span>
            {symbol}
          </p>
        </div>
        <div className="main-detail__price">
          <p> £{current_price} </p>
          <p>Updated {timeDifference} seconds ago</p>
        </div>
      </section>
    </>
  );
}
