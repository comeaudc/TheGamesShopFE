import { useState, useEffect } from "react";
import { userInfo } from "../../context/user/userContext";
import CartItem from "./CartItem";

export default function Cart() {
  const { getTotal, cart } = userInfo();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(getTotal());
  }, [cart, getTotal]);

  if (!cart.length) {
    return (
      <div className="cartEmptyMessage">
        <h3>Your cart is empty...</h3>
        <h3>Go buy something cool!</h3>
      </div>
    );
  }

  return (
    <div className="cartContainer">
      <h2>Cart Items:</h2>
      <ul className="cartList">{cart.map(item => (
        <CartItem
          key={item.game._id}
          qty={item.qty}
          game={item.game}
          id={item.game._id}
        />
      ))}</ul>
      <div className="cartTotal">Total: ${total.toFixed(2)}</div>
    </div>
  );
}
