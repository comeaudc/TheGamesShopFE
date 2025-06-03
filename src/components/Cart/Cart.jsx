import CartItem from "./CartItem";

export default function Cart({ cart }) {
  function cartList() {
    return cart.map((item) => {
      return <CartItem key={item.game._id} qty={item.qty} game={item.game} id={item.game._id} />;
    });
  }

  return cart.length ? (
    <ul>Cart Items: {cartList()}</ul>
  ) : (
    <>
    <h3>Your cart is empty...</h3>
    <h3> Go buy something cool!</h3>
    </>
  );
}
