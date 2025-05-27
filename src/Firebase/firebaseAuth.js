import {
    getAuth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut
} from "firebase/auth";
import {app} from "./setup.js";

class FirebaseAuth{

    authApp

    constructor(){
        this.authApp = getAuth(app);
    }


    // Method to create a new account of user
    async createAccount(email, password){
        try {
            await createUserWithEmailAndPassword(this.authApp, email, password);
        } catch (error){
            throw Error("Unable to create account");
        }
    }


    // Method to login a user
    async login(email, password){
        try{
            await signInWithEmailAndPassword(this.authApp, email, password);
        } catch (error){
            throw Error("Unable to login");
        }
    }


    // Method to logout
    async logout(){
        try{
            await signOut(this.authApp);
        } catch (error){
            throw Error("Unable to logout");
        }
    }


    // Method to get current logged in user
    async getCurrentUser(){
        return this.authApp.currentUser || null;
    }

}

const firebaseAuth = new FirebaseAuth();
export default firebaseAuth;