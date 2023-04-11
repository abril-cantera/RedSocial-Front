import React, { useState } from "react";
import { Navigate } from 'react-router-dom'
import { useAuth } from "../Auth/auth";
import './LoginPage.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export function LoginPage() {
  const auth = useAuth()
  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState('')

  const [info, setInfo] = useState([])



  const url = 'http://18.191.55.134:3000/red/user'
  async function getData(e) {
    e.preventDefault()
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await response.json()
    setInfo(info)
    setUserId(info.id)
    const verifyUser = data.some((item) => item.user === username)


    switch (true) {
      case verifyUser === true:
        auth.login({ username, userId });
        localStorage.setItem('loggedUser', JSON.stringify({ id: userId, user: username }))
        break;
      case verifyUser === false:
        MySwal.fire({
          title: 'Usuario no registrado'
        });
        break;

      default:
        break;
    }

  }


  if (auth.user) {
    return <Navigate to='/profile' />
  }

  return (
    <>
      <div className="wrapper">
        <div className="form-box login">
          <h1>Login</h1>

          <form onSubmit={getData}>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="person"></ion-icon>
              </span>
              <input value={username} onChange={e => setUsername(e.target.value)} required />
              <label>Usuario</label>
            </div>

            <button className="btn" type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </>
  )
}