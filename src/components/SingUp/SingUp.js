import React from 'react';
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import './../LogIn/LoginPage.css'

export function SingUp() {
  const [info, setInfo] = useState([])

  const [nameComplete, setNameComplete] = useState('')
  const [name, setName] = useState('')
  const [correo, setCorreo] = useState('')

  const url = 'http://18.191.55.134:3000/red/user'

  async function getData(evento) {
    evento.preventDefault();
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await response.json()
    console.log(data);
    const verifyUser = data.some((item) => item.user === name)
    const verifyEmail = data.some((item) => item.email === correo)

    switch (true) {
      case (verifyUser === true && verifyEmail === true):
        MySwal.fire({
          title: 'Usuario y correo ya registrados',
          customContainerClass: 'mi-swal'
        });
        break;
      case (verifyUser === true && verifyEmail === false):
        MySwal.fire({
          title: 'El usuario ya esta registrado'
        });
        break;
      case (verifyUser === false && verifyEmail === true):
        MySwal.fire({
          title: 'El correo ya esta registrado'
        });
        break;
      case (verifyUser === false && verifyEmail === false):
        MySwal.fire({
          title: 'Registro exitoso'
        });
        postData()
        break;

      default:
        break;
    }

    setInfo(info)
  }

  const postData = async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': nameComplete,
        'user': name,
        'email': correo,
        'image': 'https://i.pinimg.com/originals/e7/b2/d1/e7b2d14bd707337b544140c2a3459ec0.png'
      })
    })
    const data = await response.json()
    console.log(data);

  };

  return (
    <>
      <div className="wrapper">
        <div className="form-box login">
          <h1>SingUp</h1>
          <form onSubmit={getData} className='registro'>
            <div className="input-box">
              <input
                type='text'
                value={nameComplete}
                onChange={(event) => {
                  setNameComplete(event.target.value);
                }}
                required
              />
              <label>Nombre y Apellido</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="person"></ion-icon>
              </span>
              <input
                type='text'
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                required
              />
              <label>User</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="mail"></ion-icon>
              </span>
              <input
                type='email'
                value={correo}
                onChange={(event) => {
                  setCorreo(event.target.value);
                }}
                required
              />
              <label>Email</label>
            </div>
            <button className="btn" type="submit" >Registrarse</button>
          </form>
        </div>
      </div>
    </>

  );
}