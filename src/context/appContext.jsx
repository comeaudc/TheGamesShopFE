import AuthProvider from "./auth/authContext";
import UserProvider from "./user/userContext";

// Parent functional component to house all contexts
export default function AppProvider({ children }) {
  return (
    <UserProvider>
      <AuthProvider>{children} </AuthProvider>
    </UserProvider>
  );
}
