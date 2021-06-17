import SideListItem from "./SideListItem"

export default function Sidelist({crypotoCurrencyList,isSelectedCripto,setSelectedCripto,selectedCripto}){
  return  <ul>
    {crypotoCurrencyList.map((item,index)=>{
      return (<SideListItem item={item} key={index} isSelectedCripto={isSelectedCripto} setSelectedCripto={setSelectedCripto} selectedCripto={selectedCripto} />)
    })}
    </ul>
}