import React, { useContext, useState } from 'react'
import firebaseAuth from '../Firebase/firebaseAuth.js';
import UserContext from '../Contexts/UserContext.jsx';
import { Link } from 'react-router-dom';

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");

    const {user, setUser} = useContext(UserContext);

    async function login(){
        try{
            await firebaseAuth.login(email, password);
            setUser(await firebaseAuth.getCurrentUser());
        } catch (error){
            setErrorText(error.message);
        }
    }

    return (
        <div className='flex h-screen w-screen'>
            <div className='h-[400px] w-[400px] bg-blue-200 mx-auto m-auto rounded-2xl p-2 flex flex-col gap-5'>

                <h2 className='text-center text-3xl'>Login</h2>

                <input type="email" value={email} placeholder="Enter Email" className='bg-white border-b-2 h-10 rounded px-2 border-b-blue-500' onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>
                <input type="password" value={password} placeholder="Enter Password" className='bg-white border-b-2 h-10 rounded px-2 border-b-blue-500' onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>

                <button onClick={login} className='border bg-blue-600 text-white text-xl text-bold rounded-2xl p-2 w-1/3 mx-auto'>Login</button>

                {(errorText) ? <p className='text-md text-red-500'>{errorText}</p> : null}

                <div className='flex gap-x-2'>
                    <p>Don't have Account?</p>
                    <Link to="/signup" className='text-blue-900 underline'>Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
