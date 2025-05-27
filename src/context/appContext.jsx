import AuthProvider from "./auth/authContext";

export default function AppProvider({children}){
    return <AuthProvider>{children}</AuthProvider>
}