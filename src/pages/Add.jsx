import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PlusCircle } from 'feather-icons-react/build/IconComponents';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addVideo } from '../services/all-api';
//import from react toastify
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function Add({handleresponse}) {
    const [show, setShow] = useState(false);
    //to get data
    const[uploadData,setuploadData]=useState({
      id:"",caption:"",thumbnail:"",url:""


    })
//------------
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setInput=(e)=>{
      // console.log(e.target.value);

      const{name,value}=e.target
      //... spread operatr to see all 

      setuploadData({...uploadData,[name]:value})
    }
    // console.log(uploadData);

    //function to extract video link
    const extractUrl=(e)=>{
      let youtubeUrl=e.target.value

  //  original url
     // https://www.youtube.com/watch?v=xqOdFnB0b6s

    //  iframe src 
    // "https://www.youtube.com/embed/xqOdFnB0b6s"

    if(youtubeUrl.includes("v=")){

      //to know index of v
      let index=youtubeUrl.indexOf("v=")
      console.log(index);

      let videoUrl=youtubeUrl.substring(index+2,index+13)
      console.log(videoUrl);

      let videodata=uploadData

      videodata.url=`https://www.youtube.com/embed/${videoUrl}`
      setuploadData(videodata)

    }
     
    console.log(uploadData);
    }
    
    // fuction for add button

    const handleAdd=async()=>{
      const{id,caption,thumbnail,url}=uploadData
      // if there is no add giving an toast
      if(!id||!caption||!thumbnail||!url){

        toast.success("please fill the form ",
        {position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",})

      }
      else{
        //if there is data make an api call
     const response= await addVideo(uploadData)
    
         
    if(response.status>=200 && response.status<300){
      // console.log(response.data);
      handleresponse(response.data)
      setShow(false)
      toast("new video uploaded sucessfully")

    }
    else{
      toast("please provide a unique id!!")
    }
      }

    }
   
  return (
    <>
        <div onClick={handleShow} className='btn'>
            <PlusCircle color='green' size={50}/>
        </div>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>

          <FloatingLabel className='mb-3' controlId="floatingId" label=" Uploading Video Id">
        <Form.Control type="text" placeholder="video id" name='id' onChange={setInput} />
      </FloatingLabel>

      <FloatingLabel className='mb-3' controlId="floatingCaption" label=" Uploading Video Caption">
        <Form.Control type="text" placeholder="video caption"  name='caption' onChange={setInput} />
      </FloatingLabel>

      <FloatingLabel className='mb-3' controlId="floatingImage" label=" Uploading Video Cover image url">
        <Form.Control type="text" placeholder="video cover url"  name='thumbnail' onChange={setInput} />
      </FloatingLabel>

      <FloatingLabel className='mb-3' controlId="floatingImage" label=" Uploading Video link">
        <Form.Control type="text" placeholder="video link"  name='url' onChange={extractUrl} />
      </FloatingLabel>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {/* to submit data when the button clicked */}
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark" />
    </>
  )
}

export default Add