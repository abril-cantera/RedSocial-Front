import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Auth/auth";
import './Menu.css'

function Menu() {
  const auth = useAuth()

  return (
    <header>
      <nav className="nav">
        {routes.map((route) => {
          if (route.publicOnly && auth.user) return null
          if (route.private && !auth.user) return null
          return (
            <NavLink key={route.to}
              style={({ isActive }) => ({ color: isActive ? "black" : "white" })}
              to={route.to}
            >
              {route.text}
            </NavLink>
          )
        })}
      </nav >
    </header>
  );
}
const routes = [];
routes.push({
  to: "/",
  text: "Home",
  private: false
});
routes.push({
  to: "/profile",
  text: "Profile",
  private: true
});
routes.push({
  to: "/login",
  text: "Login",
  publicOnly: true,
  private: false
});
routes.push({
  to: "/singup",
  text: "SingUp",
  publicOnly: true,
  private: false
});
routes.push({
  to: "/logout",
  text: "Logout",
  private: true
});
export { Menu };
