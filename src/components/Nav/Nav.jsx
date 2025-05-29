import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import { useAuth } from "../../context/auth/authContext";
import { userInfo } from "../../context/user/userContext";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { user } = userInfo();
  const { cookies, logout } = useAuth();
  const nav = useNavigate();

  function handleLogout() {
    logout();

    nav("/");
  }
  return (
    <nav className={styles.mainNav}>
      <ul>
        <li>
          <Link to="/">HomePage</Link>
        </li>

        {cookies.token ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            {user && user.admin ? (
              <li>
                <Link to="/create">Create Form</Link>
              </li>
            ) : null}

            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/auth">SignIn/SignUp</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
