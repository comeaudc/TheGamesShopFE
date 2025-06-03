import { useState, useRef } from "react";
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
    setEdit(true);
    setItemQty(e.target.value);
  }

  async function onSave(e) {
    e.preventDefault();
    setEdit(false);

    if (itemQty == qtyRef.current) return setEdit(false);

    try {
      let change = itemQty - qtyRef.current;

      let res = await axios.post(
        `http://localhost:3000/api/cart/${game._id}`,
        {
          qty: change,
        },
        { headers: { token: cookies.token } }
      );
      if (itemQty == 0) {
        let answer = confirm(
          `Are you sure you want to remove this item from your cart?`
        );

        if (!answer) return setEdit(false);

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
    <li>
      <h3>{game.title}</h3>
      <label>
        Qty:{" "}
        <input
          onChange={handleChange}
          type="number"
          name="qty"
          value={itemQty}
        />{" "}
        {edit && <button onClick={onSave}>Update</button>}
      </label>
      <h4>Price: ${(game.price * itemQty).toFixed(2)}</h4>
    </li>
  );
}
