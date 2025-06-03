import { useEffect, useState } from 'react'
import './App.css'
import UserContext from './Contexts/UserContext'
import themeContext from './Contexts/ThemeContext.jsx'
import { Outlet } from 'react-router-dom'
import firebaseAuth from './Firebase/firebaseAuth.js'

function App() {

  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme")=="dark" || "light");

  useEffect(()=>{
    const root = window.document.documentElement;
    
    if (darkMode){
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div>
      <themeContext.Provider value={{darkMode, setDarkMode}}>
        <UserContext.Provider value={{user, setUser}}>
          <Outlet/>
        </UserContext.Provider>
      </themeContext.Provider>
    </div>
  )
}

export default App
