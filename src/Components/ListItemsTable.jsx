import React from 'react'
import {v4 as uuid} from "uuid";

function ListItemsTable(props) {

    const {listInfo} = props;
    
    // ListInfo[0] contains list names while ListInfo[1] contains object {Data, Header}
    const headers = listInfo[1]["Headers"];
    const listData = listInfo[1]["Data"];

  return (
    <table className='w-full'>
        <thead>
            <tr className='bg-yellow-100'>
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
                    {
                        headers.map((header)=>(
                            <td key={uuid()} className='text-center border-1 p-2'>{(Object.keys(row[1]).includes(header)) ? row[1][header] : null }</td>
                        )) 
                    }
                </tr>
            )) : null}
        </tbody>
    </table>
  )
}

export default ListItemsTable
