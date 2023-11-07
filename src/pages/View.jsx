import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Videocard from './Videocard'
import {getVideo} from '../services/all-api'
import { useEffect } from 'react'




function View({serverRes}) {

   
  //create a state for holding api response

  const[allVideos,setallVideos]=useState([])

  const [deleteStaus,setdeleteStatus]=useState(false)



  const handledeleteStatus=(res)=>{
    setdeleteStatus(res)

  }
  //hook
  useEffect(() => {
    //call back function body
    getallVideos()
  
    
  }, [serverRes,deleteStaus])
  

  //creating a function getallVideos() and calling the function getVideo() inside it
 const  getallVideos =async()=>{

 let response= await getVideo()
  setallVideos(response.data);
 }
 console.log(allVideos);

  return (
    <div className='border p-3 round ms-4'>
        <Row>
          {/* for duplicating data we use map method . duplicated item should be given in {}*/}
            {
              allVideos.map(Video=>(
                <Col  className='ps-3 mb-3' sm={12} md={6}>
                <Videocard card={Video} handledeleteStatus={handledeleteStatus}/>
             </Col>
            
              ))
            }
              
        </Row>
        
    </div>
  )
}

export default View