import { useEffect, useState } from "react";

import MainDetail from "./components/MainDetail";

import {getCripto} from "./constants"

import SideListItem from "./components/SideListItem"
import { getNews } from "./constants";

import{updatePrice} from './constants'
import NewsCard from "./components/NewsCard";
import Sidelist from "./components/Sidelist";

function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCripto, setSelectedCripto] = useState(false);
  const[crypotoCurrencyList, setCrypotoCurrencyList] = useState([])
  const[news,SetNews]=useState([])
  
  
  // This function gives you whether a coin has been selected or not
// You will need this for the SideListItem component
  function isSelectedCripto(id) {
    return selectedCripto === id;
  }


  useEffect(()=>{
    getCripto().then(crypotoFromServer=>{
      setCrypotoCurrencyList(crypotoFromServer)
    })
    getNews().then(newsFromServer=> {let uniqueNews = []
      for(const news of newsFromServer.status_updates){
        if(!uniqueNews.some(newsItem=>newsItem.description === news.description)){
          uniqueNews.push(news)
        }
      }
      SetNews(uniqueNews)
    }
      )
  },[])


  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <aside className="side-list">
     <Sidelist crypotoCurrencyList={crypotoCurrencyList} isSelectedCripto={isSelectedCripto} setSelectedCripto={setSelectedCripto} selectedCripto={selectedCripto} />
      </aside>
      <main className="main-detail">
        {selectedCripto
          ? <MainDetail selectedCripto={selectedCripto} setCrypotoCurrencyList={setCrypotoCurrencyList} crypotoCurrencyList={crypotoCurrencyList}/>
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
