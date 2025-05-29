import { useEffect } from "react";
import { userInfo } from "../context/user/userContext";
import { useAuth } from "../context/auth/authContext";
import axios from "axios";

export default function Dashboard() {
  const { cookies } = useAuth();
  const { setUser, setCart } = userInfo();

  useEffect(() => {
    async function getUser() {
      try {
        let res = await axios.get(`http://localhost:3000/api/user`, {
          headers: { token: cookies.token },
        });

        const { username, admin, email } = res.data;

        setCart(res.data.cart.items);
        setUser({ username, email, admin });
      } catch (err) {
        console.error(err.message);
      }
    }

    getUser();
  }, []);

  return <h1>Dashboard</h1>;
}
