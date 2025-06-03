import React, { useState, useEffect, useContext } from 'react'
import { FaSquarePlus } from "react-icons/fa6";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddList from '../Components/AddList.jsx';
import ListItemsTable from '../Components/ListItemsTable.jsx';
import firebaseAuth from '../Firebase/firebaseAuth.js';
import firebaseDatabase from '../Firebase/firebaseDatabase.js';
import UserContext from '../Contexts/UserContext.jsx';
import AddListItem from "../Components/AddListItem.jsx";
import ConfirmBox from '../Components/ConfirmBox.jsx';

function MainScreen() {

    // Variables for visibility of some components or some blocks
    const [addListOption, setAddListOption] = useState(false);
    const [addListItemOption, setAddListItemOption] = useState(false);
    const [showConfirmDeleteBox, setShowConfirmDeleteBox] = useState(false);                // Popup box to delete lists
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    const [userLists, setUserLists] = useState({});
    const [listDataNo, setListDataNo] = useState(-1);
    const [deleteList, setDeleteList] = useState([]);

    const {setUser} = useContext(UserContext);

    function showAddListOption() {
        setAddListOption(true);
    }

    function showAddListItemOption() {

        if (listDataNo == -1){
            return;
        }

        setAddListItemOption(true);
    }

    function deleteListToggle(i){
        const updatedDeleteList = [...deleteList];
        updatedDeleteList[i] = !updatedDeleteList[i];
        setDeleteList(updatedDeleteList);
        setShowDeleteButton(updatedDeleteList.some((x)=>x===true));
    }

    async function deleteSelectedLists(){

        const deleteListNames = Object.entries(userLists).map((list)=>list[0]).filter((data, i)=>deleteList[i])

        try{
            await firebaseDatabase.deleteLists(deleteListNames);
            setShowConfirmDeleteBox(false);

            // Resetting list related variables
            setUserLists(await firebaseDatabase.getLists());
            setDeleteList([]);
            setListDataNo(-1);
            setShowDeleteButton(false);
        } catch (error){
            console.log(error);
        }
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
                    setDeleteList(Object.entries(lists).map((x)=>(false)));
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
            <div className='flex h-15 w-full px-10 items-center justify-between p-1'>
                {/* Logo of the website */}
                <div className='h-full'>
                    <img src="images/listify_logo.png" alt="Logo of Listify" className='h-full' />
                </div>
                <div className='flex gap-10'>
                    <button className='border-2 border-blue-600 font-bold px-3 hover:bg-blue-500 hover:rounded hover:cursor-pointer' onClick={logout}>Logout</button>
                </div>
            </div>
        </nav>

        <div className='flex w-full flex-grow'>

            {/* Left Sidebar */}
            <div className='flex flex-col w-75 h-full border-r-2 border-gray-400'>
                <div className='flex justify-between py-2 px-5 border-b'>
                    <div className='underline decoration-double'>My Lists</div>
                    <div className='flex gap-x-1'>
                        <MdDelete className={`text-red-600 text-xl ${(showDeleteButton)?'block':'hidden'}`} onClick={()=>{setShowConfirmDeleteBox(true)}} />
                        <FaSquarePlus className='text-xl' onClick={showAddListOption}/>
                    </div>
                </div>
                <div className='flex flex-col overflow-x-hidden'>
                    {Object.entries(userLists).map(
                        (data, i)=>(<div className='flex justify-start items-center px-2 h-10 w-full overflow-x-hidden border-b-1' key={data}>
                            <div className='flex'><input type="checkbox" checked={(deleteList[i]?true:false)} onChange={()=>deleteListToggle(i)} className='h-5 w-5 hover:cursor-pointer'/></div>
                            <div className='w-full mx-2' onClick={()=>setListDataNo(i)}>{data[0]}</div>
                            <div className=''><MdModeEdit className='h-5 w-5 hover:cursor-pointer'/></div>
                        </div>)
                    )}
                </div>
            </div>

            {/* Main Portion on Right that displays table  */}
            <div className='w-full max-w-full h-full relative p-2 overflow-auto'>
                {(listDataNo !== -1) ? <ListItemsTable listInfo = {Object.entries(userLists)[listDataNo]} setUserLists={setUserLists}/> : null}

                {/* Large Add Button at bottom right corner */}
                <BsPlusCircleFill className='text-5xl fixed bottom-10 right-10' onClick={showAddListItemOption}/>

                {/* Hidden AddList */}
                {addListOption?(<AddList setAddListOption={setAddListOption} listDataNo={listDataNo} setUserLists={setUserLists} setListDataNo={setListDataNo}/>):null}

                {/* Hidden AddListItem */}
                {addListItemOption?(<AddListItem setAddListItemOption={setAddListItemOption} userLists={userLists} setUserLists={setUserLists} listDataNo={listDataNo}/>):null}

                {/* Hidden Delete Lists Confirm Box */}
                {showConfirmDeleteBox?<ConfirmBox mainText='Do you want to delete all these lists?' deleteButtonText='Yes, Delete' cancelButtonText='No, Cancel' deleteButtonCallback={deleteSelectedLists} cancelButtonCallback={()=>setShowConfirmDeleteBox(false)}/>:null}

            </div>
        </div>
    </div>
  )
}

export default MainScreen
