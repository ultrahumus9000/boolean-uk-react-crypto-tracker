import { useEffect, useState } from "react";

import MainDetail from "./components/MainDetail";

import {getCripto} from "./constants"

import SideListItem from "./components/SideListItem"
import { getNews } from "./constants";


import NewsCard from "./components/NewsCard";

function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCripto, setSelectedCripto] = useState(false);
  const[crypotoCurrencyList, setCrypotoCurrencyList] = useState([])
  const[news,SetNews]=useState([])

//  useEffect(()=>{getCripto().then(crypotoFromServer=> {
//   setcrypotoCurrencyList([...crypotoCurrencyList,crypotoFromServer ])
// })},[])

  useEffect(()=>{
    getCripto().then(crypotoFromServer=>{
      setCrypotoCurrencyList(crypotoFromServer)
    })
    getNews().then(newsFromServer=>SetNews(newsFromServer.status_updates))
  },[])


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
        return (<SideListItem item={item} key={index} isSelectedCripto={isSelectedCripto} setSelectedCripto={setSelectedCripto} selectedCripto={selectedCripto} />)
      })}
      </ul>
      </aside>
      <main className="main-detail">
        {selectedCripto
          ? <MainDetail selectedCripto={selectedCripto} crypotoCurrencyList={crypotoCurrencyList}/>
          : "Select a coin bro!"}
          <ul className='newsfeed'>
          {news.map((newsItem,index)=>{
          return <NewsCard newsItem={newsItem} key={index} />
        })}
          </ul>
        
      </main>
    </>
  );
}

export default App;
