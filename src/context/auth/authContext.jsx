import { createContext, useContext, useMemo } from "react";
import { userInfo } from "../user/userContext";
import { useCookies } from "react-cookie";
import axios from "axios";

const AuthContext = createContext(); //Created our context with No value

// Created functional component to PROVIDE context
export default function AuthProvider({ children }) {
  const { setUser, setCart } = userInfo();
  const [cookies, setCookie, removeCookie] = useCookies();

  const baseURL = `https://thegamesshopbe.onrender.com/api/user`;

  async function signup(formData) {
    const res = await axios.post(`${baseURL}/register`, formData);

    setCookie("token", res.data.token);
  }

  async function login(formData) {
    const res = await axios.post(`${baseURL}/login`, formData);

    setCookie("token", res.data.token);
  }

  function logout() {
    ["token"].forEach((cookie) => {
      removeCookie(cookie);
    });

    setCart(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      cookies,
      signup,
      login,
      logout,
    }),
    [cookies]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
