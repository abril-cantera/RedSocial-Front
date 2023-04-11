import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/Home/HomePage";
import { AuthProvider, AuthRoute } from "./components/Auth/auth";
import { Menu } from "./components/Menu/Menu";
import { LoginPage } from "./components/LogIn/LoginPage";
import { LogoutPage } from "./components/LogOut/LogoutPage";
import { ProfilePage } from "./components/Inicio/ProfilePage";
import { SingUp } from "./components/SingUp/SingUp";
import { NotFound } from './components/NotFound/NotFound'

function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Menu />

          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/singup" element={<SingUp />} />
            <Route path="/logout" element={
              <AuthRoute>
                <LogoutPage />
              </AuthRoute>
            } />
            <Route path="/profile" element={
              <AuthRoute>
                <ProfilePage />
              </AuthRoute>
            } />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App;
