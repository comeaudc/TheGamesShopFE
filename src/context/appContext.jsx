import AuthProvider from "./auth/authContext";
import UserProvider from "./user/userContext";

// Parent functional component to house all contexts
export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
}
