import {getDatabase, ref, set, push, onValue, get} from "firebase/database";
import firebaseAuth from "./firebaseAuth";

class FirebaseDatabase{

    database;

    constructor(){
        this.database = getDatabase();
    }

    async createNewList(listName, headers){
        const user = firebaseAuth.getCurrentUser();
        try{
            await set(
                ref(this.database, `${user.uid}/${listName}`), 
                {
                    Headers: headers.filter((data)=>data),
                }
            )
            console.log("List Created Successfully!");
        } catch (error){
            console.log(`Couldn't create a new list! ${error}`);
        }
    }

    async getHeaders(listName){
        const user = firebaseAuth.getCurrentUser();
        try{
            const snapshot = await get(
                ref(this.database, `${user.uid}/${listName}/Headers`),
            )

            if (snapshot.exists()){
                return snapshot.val();
            } else {
                return [];
            }
        } catch (error){
            console.log(error);
        }
    }

    async addNewItemToList(listName, listItem){
        try{
            const headers = await this.getHeaders(listName);

            await push(
                ref(this.database, `${firebaseAuth.getCurrentUser().uid}/${listName}/Data`),
                Object.fromEntries(Object.entries(listItem).filter(([item])=>headers.includes(item)))
            )
            console.log("List Item Successfully Added to List");
        } catch (error){
            console.log(`Couldn't add a new list item to list", ${error}`);
        }
    }

}

const firebaseDatabase = new FirebaseDatabase();
export default firebaseDatabase;