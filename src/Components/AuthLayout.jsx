import React, { useContext, useEffect } from 'react'
import UserContext from '../Contexts/UserContext'
import { useNavigate } from 'react-router-dom';
import firebaseAuth from '../Firebase/firebaseAuth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../Firebase/setup';

function AuthLayout(props) {

    const {user, setUser} = useContext(UserContext);
    const {authentication, children} = props;
    const navigate = useNavigate();

    useEffect(() => {
      
        const unsubscribe = onAuthStateChanged(firebaseAuth.authApp, (loggedInUser) => {
          if (loggedInUser) {
            setUser(loggedInUser);
          } else {
            setUser(null);
          }
        });

        // Cleanup function
        return () => unsubscribe();

    }, []);

    useEffect(()=>{
      if (authentication && !user){
          navigate("/login");
      } else if (!authentication && user){
          navigate("/");
      }
    }, [user, navigate, authentication])

  return ( 
    <div>{children}</div>
  )
}

export default AuthLayout
