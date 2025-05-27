import { useEffect, useState } from 'react'
import './App.css'
import UserContext from './Contexts/UserContext'
import { Outlet } from 'react-router-dom'
import firebaseAuth from './Firebase/firebaseAuth.js'

function App() {

  const [user, setUser] = useState(null);

  return (
    <div>
      <UserContext.Provider value={{user, setUser}}>
        <Outlet/>
      </UserContext.Provider>
    </div>
  )
}

export default App
