import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Modal, Button } from 'react-bootstrap';


function Skills() {
    const [skills, skillsSet] = useState("")

    const navigate = useNavigate()

    let skillsGet = () => {
        fetch("http://localhost:8081/skills", {
              method: "GET",
              headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
              }
          }
          ).then(res=>res.json())
          .then(response=>{
            console.log(response)
            skillsSet(response)
          })
          .catch(er=>{
            console.log(er.message)
        })
    }

    React.useEffect(skillsGet, [])

    return (
        <>
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
            <Modal.Dialog>
                <Modal.Header closeButton>
                <Modal.Title>Skills list</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <p>{skills}</p>
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={()=>{ navigate('/') }}>
                    Close
                </Button>
                {/* <Button variant="primary">Save changes</Button> */}
                </Modal.Footer>
            </Modal.Dialog>
            </div>
            
        </>

    )
}

export default Skills