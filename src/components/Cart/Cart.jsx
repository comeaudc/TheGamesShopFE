import { useState, useEffect } from "react";
import { userInfo } from "../../context/user/userContext";
import CartItem from "./CartItem";

export default function Cart() {
  const { getTotal, cart } = userInfo();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total = getTotal();
    setTotal(total);
  }, [cart]);

  function cartList() {
    let cartList = cart.map((item) => {
      return (
        <CartItem
          key={item.game._id}
          qty={item.qty}
          game={item.game}
          id={item.game._id}
        />
      );
    });

    return cartList;
  }

  return cart.length ? (
    <ul>
      Cart Items: {cartList()}Total: ${total.toFixed(2)}
    </ul>
  ) : (
    <>
      <h3>Your cart is empty...</h3>
      <h3> Go buy something cool!</h3>
    </>
  );
}
