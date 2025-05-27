import React, { useState, useEffect, useContext } from 'react'
import { FaSquarePlus } from "react-icons/fa6";
import { BsPlusCircleFill } from "react-icons/bs";
import AddList from '../Components/AddList.jsx';
import ListItemsTable from '../Components/ListItemsTable.jsx';
import firebaseAuth from '../Firebase/firebaseAuth.js';
import firebaseDatabase from '../Firebase/firebaseDatabase.js';
import UserContext from '../Contexts/UserContext.jsx';
import AddListItem from "../Components/AddListItem.jsx";

function MainScreen() {

    const [addListOption, setAddListOption] = useState(false);
    const [addListItemOption, setAddListItemOption] = useState(false);
    const [userLists, setUserLists] = useState({});
    const [listDataNo, setListDataNo] = useState(-1);

    const {setUser} = useContext(UserContext);

    function showAddListOption() {
        setAddListOption(true);
    }

    function showAddListItemOption() {
        setAddListItemOption(true);
    }

    async function logout() {
        await firebaseAuth.logout();
        setUser(null);
    }

    useEffect(()=>{
        const fn = async() => {
            try{
                const lists = await firebaseDatabase.getLists()
                setUserLists(lists);
                if (Object.entries(lists).length > 0){
                    setListDataNo(0);
                }
            } catch (error){
                setUserLists({});
            }
        }

        fn();
    }, []);

  return (
    <div className='flex flex-col h-screen w-screen'>

        {/* Navbar */}
        <nav className='bg-blue-600'>
            <div className='flex h-10 w-full px-10 items-center justify-between'>
                <div>Listify Logo</div>
                <div className='flex gap-10'>
                    <input type="text" className='rounded-lg text-md px-2 w-75 h-7 bg-white text-right' placeholder='Search List Item'/>
                    <button className='border-2 border-blue-600 px-3 hover:bg-blue-500 hover:rounded' onClick={logout}>Logout</button>
                </div>
            </div>
        </nav>

        <div className='flex h-full w-full'>

            {/* Left Sidebar */}
            <div className='flex flex-col w-75 h-full border-r-2 border-gray-400'>
                <div className='flex justify-between py-2 px-5 border-b'>
                    <div>My Lists</div>
                    <FaSquarePlus className='text-xl' onClick={showAddListOption}/>
                </div>
                <div className='flex flex-col overflow-x-hidden'>
                    {Object.entries(userLists).map(
                        (data, i)=>(<div className='flex justify-left items-center px-2 h-10 w-full overflow-x-hidden border-b-1' key={data} onClick={()=>setListDataNo(i)}>{data[0]}</div>)
                    )}
                </div>
            </div>

            {/* Main Portion on Right that displays table  */}
            <div className='w-full h-full relative p-2'>
                {(listDataNo !== -1) ? <ListItemsTable listInfo = {Object.entries(userLists)[listDataNo]}/> : null}

                {/* Large Add Button at bottom right corner */}
                <BsPlusCircleFill className='text-5xl absolute bottom-10 right-10' onClick={showAddListItemOption}/>

                {/* Hidden AddList */}
                {addListOption?(<AddList setAddListOption={setAddListOption} listDataNo={listDataNo} setUserLists={setUserLists} setListDataNo={setListDataNo}/>):null}

                {/* Hidden AddListItem */}
                {addListItemOption?(<AddListItem setAddListItemOption={setAddListItemOption} userLists={userLists} setUserLists={setUserLists} listDataNo={listDataNo}/>):null}

            </div>
        </div>
    </div>
  )
}

export default MainScreen
