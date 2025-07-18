import { useEffect } from "react";
import { userInfo } from "../context/user/userContext";
import { useAuth } from "../context/auth/authContext";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";
import axios from "axios";
import Cart from "../components/Cart/Cart";

export default function Dashboard() {
  const { cookies } = useAuth();
  const { setUser, setCart, user } = userInfo();

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(
          `https://thegamesshopbe.onrender.com/api/user`,
          {
            headers: { token: cookies.token },
          }
        );
        const { username, admin, email, cart } = res.data;
        setCart(cart.items);
        setUser({ username, email, admin });
      } catch (err) {
        console.error(err.message);
      }
    }

    getUser();
  }, [cookies.token, setCart, setUser]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="dashboardContainer">
      <h1 style={{ textAlign: "center" }}>Welcome {user.username}!</h1>
      {user.admin ? <AdminDashboard /> : <Cart />}
    </div>
  );
}
