import React, { useEffect, useState } from "react";
import { AuthRoute } from "../Auth/auth";
import './profilePage.css'
export function ProfilePage() {
  const [info, setInfo] = useState([])

  const getImage = async () => {
    const url = 'http://18.191.55.134:3000/red/user'

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await response.json()
    console.log(data);
    setInfo(data);
  }

  useEffect(() => {
    getImage()
  }, []);

  return (
    <AuthRoute>
      <div>
        <section>
          {
            info.map(item =>
              <section key={item.id}>
                <img className="img" src={item.image} alt="Imagen de perfil" />
              </section>
            )
          }
        </section>
      </div>
    </AuthRoute>
  )
}