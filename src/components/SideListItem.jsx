export default function SideListItem({ isSelectedCripto, selectCripto, item }) {
  const { id, name } = item;
  return (
    <li>
      <button
        className={isSelectedCripto(id) ? "selected" : ""}
        onClick={() => selectCripto(id)}
      >
        {name}
      </button>
    </li>
  );
}
