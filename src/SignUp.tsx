import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    id: string,
    name: string,
    // roles: []
}

function SignUp() {
    const [name, nameSet] = useState("")
    const [email, emailSet] = useState("")
    const [password, passwordSet] = useState("")
    const [error, errorSet] = useState("")

    const navigate = useNavigate()

    let validate = () => {
        fetch(`http://localhost:8080/auth/validate?token=${localStorage.getItem('token')}`, {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        }).then(res=>res.json())
        .then(response=>{
            if(response) {
                navigate('/profiles')
            }
        })
    }

    useEffect(validate)

    let register = () => {
        fetch("http://localhost:8080/auth/register", {
              method: "POST",
              body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                }),
              headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
              },
          }
          ).then(response=>{
            if(response) {
                login()
            }
          })
          .catch(er=>{
            console.log(er.message)
        })
    }

    let login = () => {
        fetch("http://localhost:8080/auth/token", {
            method: "POST",
            headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
            }, body: JSON.stringify({
                name: name,
                password: password
            })
        }).then(res=>res.text())
          .then(response=>{
            localStorage.setItem('token', response)
            const decoded = jwtDecode<JwtPayload>(response);
            localStorage.setItem('id', decoded.id)
            localStorage.setItem('name', decoded.name)
            // localStorage.setItem('roles', decoded.roles)

            navigate("/profiles")
          })
          .catch(er=>{
            console.log(er.message)
        })
    }

    return(
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <Card className="px-4">
                    <Card.Body>
                        <div className="mb-3 mt-md-4">
                        <h2 className="fw-bold mb-2 text-center ">
                            Sign Up
                        </h2>
                        <div className="mb-3">
                            <Form noValidate onSubmit={e => {
                                e.preventDefault()
                                register()
                                // console.log(name, password, email)
                            }}>
                            <Form.Group className="mb-3" controlId="Name">
                                <Form.Label className="text-center">Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name"
                                    onChange={a => nameSet(a.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="text-center">
                                Email address
                                </Form.Label>
                                <Form.Control type="email" placeholder="Enter email"
                                    onChange={a => emailSet(a.target.value)}
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                    onChange={a => passwordSet(a.target.value)}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCheckbox"
                            ></Form.Group>
                            <div className="d-grid">
                                <Button variant="primary" type="submit">
                                    Create Account
                                </Button>
                            </div>
                            </Form>
                            <div className="mt-3">
                            <p className="mb-0  text-center">
                                Already have an account?{' '}
                                <a onClick={()=>{
                                    navigate('/signin')
                                }} className="text-primary fw-bold" style={{cursor: "pointer"}}>
                                    Sign In
                                </a>
                            </p>
                            <p>
                                <Button variant="secondary" onClick={()=>{ navigate('/profiles') }} style={{marginTop: "20px"}}>
                                    Profiles page
                                </Button>
                            </p>

                            <p>
                                <Button variant="secondary" onClick={()=>{ navigate('/skills') }}>
                                    Skills page
                                </Button>
                            </p>
                
                            </div>
                        </div>
                        
                        </div>
                    </Card.Body>
                    </Card>
                </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SignUp