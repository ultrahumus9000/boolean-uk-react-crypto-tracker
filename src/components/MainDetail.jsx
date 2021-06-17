import { useEffect, useState } from "react";


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

export default function MainDetail({selectedCripto,crypotoCurrencyList,currentPriceObj}) {
 
const{symbol,last_updated}= crypotoCurrencyList.find(item=>item.id===selectedCripto)

const[timeDifference, settimeDifference]=useState(currentTime()- convertToSeconds(last_updated)) 


useEffect(()=>{
 let intervalId = setInterval(()=>{settimeDifference(currentTime()- convertToSeconds(last_updated))},1000)
 return ()=>{clearInterval(intervalId)
}
},[])



  return (
    <>
      <section className="main-detail__central">
        <div className="main-detail__update">
        {/* {countDown===null?'' : <p>next update in {countDown}</p>} */}
        <button className ="main-detail__button" onClick={
         ()=>{}
        }>Start update</button>
        </div>
        <div className="main-detail__name">
        <h2>{selectedCripto}</h2>
    <p><span className="small">a.k.a </span>{symbol}</p>
        </div>
        <div className="main-detail__price">
        <p> £{currentPriceObj.gbp} </p>
    <p>Updated {timeDifference} seconds ago</p>
        </div>
      </section>
    </>
  );
}

