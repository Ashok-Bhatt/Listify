import React, { useEffect, useState } from 'react'
import {v4 as uuid} from "uuid";
import { MdDelete } from 'react-icons/md';
import firebaseDatabase from '../Firebase/firebaseDatabase';
import ConfirmBox from './ConfirmBox';

function ListItemsTable(props) {

    const {listInfo, setUserLists} = props;
    
    // ListInfo[0] contains list names while ListInfo[1] contains object {Data, Header}
    const listName = listInfo[0];
    const headers = listInfo[1]["Headers"];
    const listData = listInfo[1]["Data"];


    const [deleteListItems, setDeleteListItems] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [showConfirmDeleteItemsBox, setShowConfirmDeleteItemsBox] = useState(false);      // Confirm Box appearing before deleting list items

    const toggleDeleteList = (i) => {
        const updatedDeleteList = [...deleteListItems];
        updatedDeleteList[i] = !updatedDeleteList[i];
        setDeleteListItems(updatedDeleteList);
        setShowDeleteButton(updatedDeleteList.some((x)=>x===true));
    }

    const deleteSelectedListItems = async () => {

        const deleteListItemsId = Object.entries(listData).map((listItem)=>listItem[0]).filter((listItem, i)=>deleteListItems[i]);

        try{
            await firebaseDatabase.deleteListItems(listName, deleteListItemsId);

            // Resetting user lists
            setUserLists(await firebaseDatabase.getLists());
            setDeleteListItems([]);
            setShowConfirmDeleteItemsBox(false);
            setShowDeleteButton(false);
        } catch {
            throw Error("Couldn't delete list items from the list.")
        }
    }

    useEffect(()=>{
        if (listData){
            setDeleteListItems(Object.entries(listData).map((listItem)=>false));
        }
    }, []);

  return (
    <div className='flex flex-col gap-y-2 h-full w-full'>
        <div className='flex gap-x-2'>
            {/* Search Bar */}
            <input type="text" className='rounded-lg text-md px-2 w-75 h-7 bg-white text-right border-2' placeholder='Search List Item'/>
            <MdDelete className={`text-red-600 text-xl h-7 w-7 ${(showDeleteButton)?'block':'hidden'}`} onClick={()=>setShowConfirmDeleteItemsBox(true)}/>
        </div>
        <table className='w-full'>
            <thead>
                <tr className='bg-yellow-100'>
                    <th className='bg-white w-10'></th>
                    {
                        headers.map((header)=>(
                            <th key={header} className='border-1 p-2'>{header}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                (listData)?Object.entries(listData).map((row, i)=>(
                        <tr key={row[0]} className={(i%2 == 0) ? 'bg-gray-200' : 'bg-gray-300'}>
                            <td className='text-center align-middle p-2 bg-white'>
                                <div className='flex h-full justify-center items-center'>
                                    <input type="checkbox" className='h-5 w-5 hover:cursor-pointer' value={(deleteListItems[i]?'true':'false') } onChange={()=>{toggleDeleteList(i)}}/> 
                                </div>
                            </td>
                            {
                                headers.map((header, j)=>(
                                    <td key={uuid()} className='text-center border-1 p-2'>{(Object.keys(row[1]).includes(header)) ? row[1][header] : null }</td>
                                )) 
                            }
                        </tr>
                )) : null}
            </tbody>
        </table>

        {/* Hidden Delete Confirm Box to delete items */}
        {showConfirmDeleteItemsBox?<ConfirmBox mainText='Do you want to delete all these lists items?' deleteButtonText='Yes, Delete' cancelButtonText='No, Cancel' deleteButtonCallback={deleteSelectedListItems} cancelButtonCallback={()=>setShowConfirmDeleteItemsBox(false)}/>:null}
    </div>
  )
}

export default ListItemsTable
