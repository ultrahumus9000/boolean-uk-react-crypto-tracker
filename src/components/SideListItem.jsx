
export default function SideListItem({ isSelectedCripto, setSelectedCripto, item,selectedCripto,currentPriceObj,setCurrentPriceObj }) {
  const { id, name } = item;

  

  return (
    <li>
      <button
        className={isSelectedCripto(id) ? "selected" : ""}
        onClick={() => {
          selectedCripto===id? setSelectedCripto(false) :setSelectedCripto(id)
        }}
      >
        {name}
      </button>
    </li>
  );
}
