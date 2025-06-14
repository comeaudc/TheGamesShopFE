import "./App.css";
import { Routes, Route } from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import AuthPage from "./pages/AuthPage/AuthPage";
import CreateForm from "./pages/Forms/CreateForm";
import EditForm from "./pages/Forms/EditForm";
import Dashboard from "./pages/Dashboard";
import ShowOnePage from "./pages/ShowOnePage/ShowOnePage";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";

// Components
import Nav from "./components/Nav/Nav";
import ProctectedRoutes from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Nav />
      <main>
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/auth" element={<AuthPage />} />

            <Route element={<ProctectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create" element={<CreateForm />} />
              <Route path="/update/:id" element={<EditForm />} />
            </Route>
            <Route path="/product/:id" element={<ShowOnePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
