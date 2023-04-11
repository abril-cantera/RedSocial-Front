import React from "react";
import { useAuth } from "../Auth/auth";

export function LogoutPage() {
  const auth = useAuth()

  const logout = (e) => {
    e.preventDefault()
    auth.logout()
    localStorage.removeItem('loggedUser')
  }
  return (
    <>
      <h1>Logout</h1>

      <form onSubmit={logout}>
        <label >Cerrar sesión?</label>

        <button type="submit">Salir</button>
      </form>
    </>
  )
}