import { remove } from 'firebase/database';
import React from 'react'
import { GiCancel } from "react-icons/gi";

function HeaderBlock(props) {

    const {title, index, headers, setHeaders} = props;

    const removeHeader = ()=>{
        setHeaders(
            (prev) => prev.filter(
                (data, i) => (i!=index)
            )
        )
    }

  return (
    <div className='flex gap-x-2 h-7 border-2 rounded px-2 bg-gray-20 items-start'>
      <div className='text-center min-w-[75px] w-fit'>{title}</div>
      <button className='h-full' onClick={removeHeader}>
        <GiCancel className='text-sm text-gray-400 m-auto'/>
      </button>
    </div>
  )
}

export default HeaderBlock
