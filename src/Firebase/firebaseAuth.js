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
            console.log(`New account created`);
        } catch (error){
            console.error(`Unable to create account: ${error.message}`);
        }
    }


    // Method to login a user
    async login(email, password){
        try{
            await signInWithEmailAndPassword(this.authApp, email, password);
            console.log('user logged in!');
        } catch (error){
            console.error(`Logged In Failed: ${error.message}`);
        }
    }


    // Method to logout
    async logout(){
        try{
            await signOut(this.authApp);
            console.log("Successfully Logged Out!");
        } catch (error){
            console.log(`Unable to logout: ${error.message}`);
        }
    }


    // Method to get current logged in user
    getCurrentUser(){
        const user = this.authApp.currentUser;
        if (user){
            return user;
        } else {
            console.log("no user logged in!");
        }
    }

}

const firebaseAuth = new FirebaseAuth();
export default firebaseAuth;