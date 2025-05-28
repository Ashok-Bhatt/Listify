import React from 'react'

function ConfirmBox(props) {

    const {mainText, deleteButtonText, cancelButtonText, deleteButtonCallback, cancelButtonCallback} = props;

  return (
    <div className='flex flex-col h-[200px] w-[500px] fixed left-1/2 top-1/2 bg-white -translate-1/2 p-5 rounded-xl border-2'>
      <div className='h-full w-full font-bold text-center text-2xl'>{mainText}</div>
      <div className='flex justify-between p-2'>
        <button className='rounded px-2 py-1 text-white font-bold bg-red-500' onClick={deleteButtonCallback}>{deleteButtonText}</button>
        <button className='rounded px-2 py-1 text-white font-bold bg-green-500' onClick={cancelButtonCallback}>{cancelButtonText}</button>
      </div>
    </div>
  )
}

export default ConfirmBox
