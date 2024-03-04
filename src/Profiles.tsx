import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Modal, Button, Form } from 'react-bootstrap';


function Profiles() {
    const [skills, skillsSet] = useState("")

    const navigate = useNavigate()

    // let skillsGet = () => {
    //     fetch("http://localhost:8081/skills", {
    //           method: "GET",
    //           headers: {
    //             'Accept': '*/*',
    //             'Content-Type': 'application/json'
    //           }
    //       }
    //       ).then(res=>res.json())
    //       .then(response=>{
    //         console.log(response)
    //         skillsSet(response)
    //       })
    //       .catch(er=>{
    //         console.log(er.message)
    //     })
    // }

    // React.useEffect(skillsGet, [])

    return (
        <>
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
            <Modal.Dialog>
                <Modal.Header closeButton>
                <Modal.Title>Profiles page</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form noValidate onSubmit={e => {
                                e.preventDefault()
                                // console.log(name, password, email)
                            }}>
                            <Form.Group className="mb-3" controlId="Name">
                                <Form.Label className="text-center">Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name"
                                    onChange={a => {}}
                                />
                            </Form.Group>
                            
                            <Form.Label className="text-center">Unit type</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option value="1">DEVELOPER</option>
                                <option value="2">UNIT</option>
                                <option value="3">TESTER</option>
                                <option value="4">ANALYST</option>
                            </Form.Select>
                            <p></p>
                            
                            <Form.Label className="text-center">Skill type</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option value="1">EMPLOYEE</option>
                                <option value="2">TEAM</option>
                            </Form.Select>
                    </Form>
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

export default Profiles