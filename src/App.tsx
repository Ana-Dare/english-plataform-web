import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import AuthProvider from "./contexts/Auth/AuthProvider";
import PageHome from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<PageHome />} />
          <Route path="*" element={<div> Página não encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
