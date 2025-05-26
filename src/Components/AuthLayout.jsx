import React, { useContext, useEffect } from 'react'
import UserContext from '../Contexts/UserContext'
import { useNavigate } from 'react-router-dom';
import firebaseAuth from '../Firebase/firebaseAuth';
import { onAuthStateChanged } from 'firebase/auth';

function AuthLayout(props) {

    const {user, setUser} = useContext(UserContext);
    const {authentication, children} = props;
    const navigate = useNavigate();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(firebaseAuth.authApp, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });

      if (authentication && !user){
          navigate("/login");
      } else if (!authentication && user){
          navigate("/");
      }

      // Cleanup function
      return () => unsubscribe();

    }, [authentication, user, navigate]);

  return ( 
    <div>{children}</div>
  )
}

export default AuthLayout
