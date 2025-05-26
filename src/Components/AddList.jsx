import React, { useState } from 'react'
import HeaderBlock from '../Components/HeaderBlock.jsx';
import firebaseDatabase from '../Firebase/firebaseDatabase.js';

function AddList(props) {

    const {setAddListOption} = props;

    const [listName, setListName] = useState("");
    const [newHeader, setNewHeader] = useState("");
    const [headers, setHeaders] = useState([]);

    const addHeader = (e) => {
        if (e.key == 'Enter'){
            setHeaders((headers)=>[...headers, newHeader]);
            setNewHeader("");
        }
    }

    const AddNewList = async () => {
        console.log(listName);
        console.log(headers);
        try{
            await firebaseDatabase.createNewList(listName, headers);
            setAddListOption(false);
        } catch (error){
            throw Error("Couldn't create a new list!");
        }
    }

  return (
    <div className='flex flex-col w-[500px] h-[500px] absolute top-1/2 left-1/2 bg-white -translate-1/2 p-5 rounded-xl border-2'>
        <div className='flex flex-col gap-y-2 border-b border-gray-400 pb-2'>
            <label htmlFor="list-name" className='text-lg'>List Name</label>
            <input name='list-name' id="list-name" placeholder='Enter List Name' className='text-lg px-2' value={listName} onChange={(e)=>setListName(e.target.value)}></input>
        </div>
        <div className='flex flex-col mt-5 gap-y-2 w-full h-full'>
            <div className='text-lg'>Enter Headers for this list</div>
            <div className='flex flex-wrap gap-2 content-start overflow-y-auto w-full h-full'>
                {headers.map((header, index)=><HeaderBlock title={header} index={index} headers={headers} setHeaders={setHeaders} key={Math.random()}/>)}
                <input type="text" className='h-7 w-40 border-2 rounded p-2' value={newHeader} onChange={(e)=>setNewHeader(e.target.value)} onKeyDown={addHeader}/>
            </div>
            <button className='bg-green-400 w-30 py-1 rounded-md hover:bg-green-300 text-xl' onClick={AddNewList}>Add List</button>
        </div>
    </div>
  )
}

export default AddList
