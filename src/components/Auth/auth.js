import React, { createContext, useContext, useEffect, useState } from "react"
import { Navigate, useNavigate } from 'react-router-dom'


const AuthContext = createContext()

function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [userbById, setUserById] = useState(null)

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const username = JSON.parse(loggedUserJSON)
      var userId = JSON.parse(loggedUserJSON)
      setUser(username)
      setUserById(userId)
    }
  }, [])

  const login = ({ username, userId }) => {
    setUser({ username })
    setUserById({ userId })
    navigate('/profile')
    localStorage.setItem('loggedUser', JSON.stringify(userId, username))
  }

  const logout = () => {
    setUser(null)
    navigate('/')
  }

  const auth = { user, userbById, login, logout }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const auth = useContext(AuthContext)
  return auth
}

function AuthRoute(props) {
  const auth = useAuth()
  if (!auth.user) {
    return <Navigate to='/login' />
  }
  return props.children
}

export {
  AuthProvider,
  useAuth,
  AuthRoute,
}