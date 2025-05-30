import { useEffect } from "react";
import { userInfo } from "../context/user/userContext";
import { useAuth } from "../context/auth/authContext";
import axios from "axios";

export default function Dashboard() {
  const { cookies } = useAuth();
  const { setUser, setCart, cart } = userInfo();

  useEffect(() => {
    async function getUser() {
      try {
        let res = await axios.get(
          `https://thegamesshopbe.onrender.com/api/user`,
          {
            headers: { token: cookies.token },
          }
        );

        const { username, admin, email } = res.data;

        setCart(res.data.cart.items);
        setUser({ username, email, admin });
      } catch (err) {
        console.error(err.message);
      }
    }

    getUser();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      {cart &&
        cart.map((el) => {
          console.log(el)
          return <p>{el.game.title}</p>;
        })}
    </>
  );
}
