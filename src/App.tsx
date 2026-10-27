import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import AuthProvider from "./contexts/Auth/AuthProvider";
import ToastProvider from "./contexts/Toast/provider";
import PageHome from "./pages/Home";
import EmailConfirmation from "./pages/EmailConfirmation";
import PageCourses from "./pages/Courses";
import CookieConsent from "./components/CookieConsent";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ForgotPassword from "./pages/ForgotPassword";
import Setpassword from "./pages/setPassword";
import PublicCertificate from "./pages/PublicCertificate";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CookieConsent />
        <BrowserRouter>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/validar-certificado/:code" element={<PublicCertificate />} />
            <Route path="/validar-certificado" element={<PublicCertificate />} />
            <Route path="/certificado/:code" element={<PublicCertificate />} />
            <Route path="/certificado" element={<PublicCertificate />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/set-password" element={<Setpassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/confirmation-email" element={<EmailConfirmation />} />
            <Route path="*" element={<div> Página não encontrada</div>} />

            {/* Rotas privadas */}
              <Route path="/apresntation" element={<PageHome />} />
              <Route path="/cursos" element={<PageCourses />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/confirmation-email"
                element={<EmailConfirmation />}
              />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
              <Route
                path="/politica-de-privacidade"
                element={<PrivacyPolicy />}
              />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
export default App;
