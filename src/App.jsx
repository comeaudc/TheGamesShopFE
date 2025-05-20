import "./App.css";
import { Routes, Route } from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import AuthPage from "./pages/AuthPage";
import CreateForm from "./pages/CreateForm/CreateForm";
import Dashboard from "./pages/Dashboard";
import ShowOnePage from "./pages/ShowOnePage";
import NotFound from "./pages/NotFound";

// Components
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/product/:id" element={<ShowOnePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
