import React, { useState } from 'react'
import {v4 as uuid} from 'uuid'
import firebaseDatabase from '../Firebase/firebaseDatabase.js';

function AddListItem(props) {

    const {setAddListItemOption, userLists, setUserLists, listDataNo} = props;

    const listName = Object.entries(userLists)[listDataNo][0];
    const headers = Object.entries(userLists)[listDataNo][1]["Headers"];

    const [newListItem, setNewListItem] = useState(headers.reduce((obj, data, index)=>{
        obj[data] = "";
        return obj;
    }, {}));

    const addNewListItem = async () => {
        
        await firebaseDatabase.addNewItemToList(listName, newListItem)
        setAddListItemOption(false);
        setUserLists(await firebaseDatabase.getLists());
        
    }

    const closeListItem = () => {
        setAddListItemOption(false);
    }

  return (
    <div className='flex flex-col w-[500px] h-[500px] gap-y-2 fixed top-1/2 left-1/2 bg-white -translate-1/2 p-5 rounded-xl border-2'>
        
        <div className='flex flex-wrap gap-y-4 content-start overflow-y-auto w-full h-full'>
            {
                headers.map((header, i)=>(
                    <div key={header} className='flex flex-col w-full rounded-2xl gap-y-1'>
                        <label>{header}</label>
                        <input type="text" className='border-1 p-1 rounded' value={newListItem[header] || ""} onChange={(e)=>{setNewListItem((prev)=>({...prev, [header]: e.target.value}))}}/>
                    </div>
                ))
            }
        </div>

        {/* Add or Cancel Headers Button */}
        <div className='flex justify-between'>
            <button className='bg-green-400 w-30 py-1 rounded-md hover:bg-green-300 text-xl' onClick={addNewListItem}>Add Item</button>
            <button className='bg-red-400 w-30 py-1 rounded-md hover:bg-red-300 text-xl' onClick={closeListItem}>Close</button>
        </div>

    </div>
  )
}

export default AddListItem
