import AuthProvider from "./auth/authContext";

// Parent functional component to house all contexts
export default function AppProvider({children}){
    return <AuthProvider>{children}</AuthProvider>
}