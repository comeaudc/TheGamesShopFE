import AuthProvider from "./auth/authContext";
import UserProvider from "./user/userContext";
import InventoryProvider from "./inventory/inventoryContext";

// Parent functional component to house all contexts
export default function AppProvider({ children }) {
  return (
    <UserProvider>
      <AuthProvider>
        <InventoryProvider>{children} </InventoryProvider>
      </AuthProvider>
    </UserProvider>
  );
}
