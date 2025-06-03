import {getDatabase, ref, set, push, remove, get} from "firebase/database";
import firebaseAuth from "./firebaseAuth";

class FirebaseDatabase{

    database;
    user;

    constructor(){
        this.database = getDatabase();
    }

    async createNewList(listName, headers){
        const user = await firebaseAuth.getCurrentUser();
        try{
            await set(
                ref(this.database, `${user.uid}/${listName}`), 
                {
                    Headers: headers.filter((data)=>data),
                }
            )
        } catch (error){
            throw Error("Unable to create new list");
        }
    }

    async getHeaders(listName){
        const user = await firebaseAuth.getCurrentUser();
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
            throw Error("Unable to get headers");
        }
    }

    async addNewItemToList(listName, listItem){
        const user = await firebaseAuth.getCurrentUser();
        try{
            const headers = await this.getHeaders(listName);

            await push(
                ref(this.database, `${user.uid}/${listName}/Data`),
                Object.fromEntries(Object.entries(listItem).filter(([item])=>headers.includes(item)))
            )
        } catch (error){
            throw Error("Add new list item");
        }
    }

    async getLists(){
        const user = await firebaseAuth.getCurrentUser();
        try{
            const snapshot = await get(
                ref(this.database, `${user.uid}`),
            )

            if (snapshot.exists()){
                return snapshot.val();
            } else {
                return [];
            }
        } catch (error){
            throw Error("Cannot fetch user lists!");
        }
    }

    async deleteLists(lists){
        const user = await firebaseAuth.getCurrentUser();
        try{
            for (let i=0; i<lists.length; i++){
                await remove(
                    ref(this.database, `${user.uid}/${lists[i]}`),
                )
            }
        } catch (error){
            throw Error("Couldn't delete lists");
        }
    }

    async deleteListItems(listName, listItems){
        const user = await firebaseAuth.getCurrentUser();
        try{
            for (let i=0; i<listItems.length; i++){
                await remove(
                    ref(this.database, `${user.uid}/${listName}/Data/${listItems[i]}`),
                )
            }
        } catch (error){
            throw Error("Couldn't delete list items!");
        }
    }

    async updateListName(oldListName, newListName){
        const user = await firebaseAuth.getCurrentUser();
        try{
            const oldRef = ref(this.database, `${user.uid}/${oldListName}`);
            const newRef = ref(this.database, `${user.uid}/${newListName}`);

            const snapshot = await get(oldRef);
            if (snapshot.exists()){
                const data = snapshot.val();
                await set(newRef, data);
                await remove(oldRef);
            } else {
                throw Error("List does not exist");
            }
        } catch (error){
            throw Error("Couldn't update list name!");
        }
    }

}

const firebaseDatabase = new FirebaseDatabase();
export default firebaseDatabase;