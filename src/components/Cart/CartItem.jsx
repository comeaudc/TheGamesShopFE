import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth/authContext";
import { userInfo } from "../../context/user/userContext";

export default function CartItem({ qty, game, id }) {
  const qtyRef = useRef(qty);
  const { cookies } = useAuth();
  const { adjustQty, removeItem } = userInfo();

  const [itemQty, setItemQty] = useState(qty);
  const [edit, setEdit] = useState(false);

  function handleChange(e) {
    setItemQty(Number(e.target.value));
    setEdit(true);
  }

  async function onSave(e) {
    e.preventDefault();
    if (itemQty === qtyRef.current) {
      setEdit(false);
      return;
    }

    try {
      const change = itemQty - qtyRef.current;

      await axios.post(
        `http://localhost:3000/api/cart/${game._id}`,
        { qty: change },
        { headers: { token: cookies.token } }
      );

      if (itemQty === 0) {
        const confirmed = window.confirm(
          "Are you sure you want to remove this item from your cart?"
        );
        if (!confirmed) {
          setItemQty(qtyRef.current);
          setEdit(false);
          return;
        }
        removeItem(id);
      } else {
        adjustQty(id, itemQty);
      }
      qtyRef.current = itemQty;
      setEdit(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <li className="cartItem">
      <Link to={`/product/${game._id}`} className="cartItemLink">
        <img
          src={game.img}
          alt={game.title}
          className="cartItemImage"
          width={80}
          height={80}
        />
        <div className="cartItemText">
          <h3>{game.title}</h3>
          <h4>Price: ${(game.price * itemQty).toFixed(2)}</h4>
        </div>
      </Link>

      <form onSubmit={onSave} className="cartItemForm">
        <label>
          Qty:{" "}
          <input
            type="number"
            name="qty"
            min="0"
            value={itemQty}
            onChange={handleChange}
          />
        </label>
        {edit && <button type="submit">Update</button>}
      </form>
    </li>
  );
}
