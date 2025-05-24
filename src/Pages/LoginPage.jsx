import React, { useState } from 'react'
import firebaseAuth from '../Firebase/firebaseAuth.js';
import firebaseDatabase from '../Firebase/firebaseDatabase.js';

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function createAccount(){
        try{
            await firebaseAuth.createAccount(email, password);
        } catch (error){
            console.error(error);
        }
    }

    async function userDetails(){
        try{
            firebaseAuth.getCurrentUser();
        } catch (error){
            console.error(error);
        }
    }

    async function logout(){
        try{
            await firebaseAuth.logout();
        } catch (error){
            console.error(error);
        }
    }

    async function login(){
        try{
            await firebaseAuth.login(email, password);
        } catch (error){
            console.error(error);
        }
    }

    async function createList() {
        await firebaseDatabase.createNewList("Companies", ["Company Name", "Difficulty Level", "Company Products"]);
    }

    async function addListItem() {
        await firebaseDatabase.addNewItemToList("Companies", {
            "Company Name" : "Microsoft",
            "Difficulty Level": "Hard",
            "Company Products" : "Bing, OpenAI",
            "Trial" : "Hi",
        })
    }

    return (
        <div className='flex h-screen w-screen'>
            <div className='h-[600px] w-[400px] bg-blue-200 mx-auto m-auto rounded-2xl'>
                <input type="email" value={email} className='bg-white border' onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>
                <input type="password" value={password} className='bg-white border' onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>

                <button onClick={createAccount} className='border'>Register</button>
                <button onClick={userDetails} className='border'>Details</button>
                <button onClick={logout} className='border'>Logout</button>
                <button onClick={login} className='border'>Login</button>
                <button onClick={createList} className='border'>Create List</button>
                <button onClick={addListItem} className='border'>Add Item</button>
            </div>
        </div>
    )
}



export default LoginPage
