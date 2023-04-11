import React, { useEffect, useState } from "react";
import 'animate.css';
import './Home.css'
export function HomePage() {
  const [info, setInfo] = useState([])
  const url = 'http://18.191.55.134:3000/red/user'

  async function getData() {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await response.json()
    console.log(data);
    setInfo(info)
  }
  useEffect(() => {
    getData()
  }, []);

  return (
    <>
      <div className="contenedor">
        <button className="circulo texto animate__animated">Noticias</button>
        <button className="circulo texto animate__animated">Marketplace</button>
        <button className="circulo texto animate__animated">Add friends</button>
        <button className="circulo texto animate__animated">Amigos</button>
        <button className="circulo texto animate__animated">Fotos</button>
        <button className="circulo texto animate__animated">Reels</button>
        <button className="circulo texto animate__animated">Notificaciones</button>
        <button className="circulo texto animate__animated">Historias</button>
      </div>
    </>
  )
}