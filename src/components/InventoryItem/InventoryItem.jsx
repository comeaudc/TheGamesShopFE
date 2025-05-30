export default function InventoryItem({ game }) {
  return (
    <div>
      <h3>{game.title}</h3>
      <p>$ {game.price}</p>
      <p>Description: {game.desc}</p>
    </div>
  );
}
