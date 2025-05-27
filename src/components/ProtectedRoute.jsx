import { Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/authContext";
import AuthPage from "../pages/AuthPage";

export default function ProctectedRoutes() {
  const { cookies } = useAuth();

  return cookies.token ? <Outlet /> : <AuthPage />;
}
