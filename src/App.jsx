import { useEffect, useState } from "react";

import MainDetail from "./components/MainDetail";

import {getCripto} from "./constants"

import SideListItem from "./components/SideListItem"


function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCripto, setSelectedCripto] = useState(null);
  const[crypotoCurrencyList, setCrypotoCurrencyList] = useState([])

//  useEffect(()=>{getCripto().then(crypotoFromServer=> {
//   setcrypotoCurrencyList([...crypotoCurrencyList,crypotoFromServer ])
// })},[])

  useEffect(()=>{
    getCripto().then(crypotoFromServer=>{
      setCrypotoCurrencyList([...crypotoCurrencyList,...crypotoFromServer ])
    })
  },[])

console.log(crypotoCurrencyList)

  // This function gives you whether a coin has been selected or not
  // You will need this for the SideListItem component
  function isSelectedCripto(id) {
    return selectedCripto === id;
  }

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <aside className="side-list">
      <ul>
      {crypotoCurrencyList.map((item,index)=>{
        return (<SideListItem item={item} key={index} isSelectedCripto={isSelectedCripto} selectCripto={setSelectedCripto} />)
      })}
      </ul>
      </aside>
      <main className="main-detail">
        {selectedCripto
          ? "Create the main detail component here"
          : "Select a coin bro!"}
        {/* News feed component needs to go here */}
      </main>
    </>
  );
}

export default App;
