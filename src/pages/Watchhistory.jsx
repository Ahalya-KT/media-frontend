import React, { useEffect, useState } from "react";
import { gethistory } from "../services/all-api";



export default function Watchhistory() {
  
  const[history,sethistory]=useState([])

  const getWatchHistory=async()=>{
  const {data}= await gethistory()
        sethistory(data)
  }
  console.log(history);

  useEffect(() => {

    getWatchHistory()
  
    
  }, [])
  
  return (
    <>
      <h2>Watchistory</h2>
      <table className=" table shadow m-3 rounded-border">
        <thead>
          <tr>
            <th>ID</th>
            <th>CardName</th>
            <th>url</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {
            history?.map((item,index)=>(
              <tr>
              <td>{index+1}</td>
              <td>{item?.cardName}</td>
              <td>{item?.url}</td>
              <td>{item?.date}</td>
            </tr>
            ))
          }
         
        </tbody>
      </table>
    </>
  );
}
