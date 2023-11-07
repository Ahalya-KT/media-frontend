import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'




function LandingPage() {
    //useNavigate 
    const navigate=useNavigate()
    const handleNavigate=()=>{
        //navigate to home
        navigate('./home')
    }
  return (
    //grid stystem setting using bootstrap
    <div>
        <Row className='align-items-center'>


            <Col></Col>
            <Col lg={6}>
                <h1>Welcome to Video.com</h1>
                <p style={{textAlign:"justify"}}>When user can use their favourite videos user can upload any youtube videos by copy and paste 
                    their url . video.com will allow to add  and remove their upload videos and also arrange in different 
                    categories by drag and drop it is free try it now!!!!!!!!
                </p>
                <button onClick={handleNavigate} className='btn btn-success'>Click Here to Know More</button>
            </Col>

            <Col lg={4}>
                <img className='img-fluid mt-5' src="https://img.freepik.com/premium-photo/speaker-with-colorful-splashes-it-generative-ai_97167-1318.jpg" alt="no image" />
            </Col>

            {/* <col></col> */}

        </Row>
    </div>
  )
}

export default LandingPage