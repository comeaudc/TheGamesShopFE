import style from "./InventoryItem.module.css";
import { Link } from "react-router-dom";
import { userInfo } from "../../context/user/userContext";
import GameControls from "../GameControls/GameControls";

export default function InventoryItem({ game }) {
  const { user } = userInfo();

  return (
    <div className={style.inventoryContainer}>
      <Link to={`/product/${game._id}`}>
        <h3>{game.title}</h3>
        <img width={"150px"} src={game.img} alt={game.title} />
      </Link>
      <p>$ {game.price.toFixed(2)}</p>
      <p>
        <strong>Category: </strong> {game.category} Game
      </p>
      <p>
        <strong>Description:</strong> {game.desc}
      </p>
      {user && (
        <GameControls gameId={game._id} admin={user.admin} inStock={game.qty} />
      )}
    </div>
  );
}
