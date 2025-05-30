import style from "./InventoryItem.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth/authContext";
import { userInfo } from "../../context/user/userContext";
import GameControls from "../GameControls/GameControls";

export default function InventoryItem({ game }) {
  const { user } = userInfo();

  return (
    <div className={style.inventoryContainer}>
      <Link to={`/product/${game._id}`}>
        <h3>{game.title}</h3>
      </Link>
      <p>$ {game.price}</p>
      <p>Description: {game.desc}</p>
      {user && <GameControls gameId={game._id} admin={user.admin} />}
    </div>
  );
}
