import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { login } from './api/login';
import './style/login.css'

function SignIn() {
    const [name, nameSet] = useState("")
    const [password, passwordSet] = useState("")
    const [error, errorSet] = useState("")

    const navigate = useNavigate()

    return(
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xl={4} xs={12}>
                    <Card className="px-4">
                    <Card.Body>
                        <div className="mb-3 mt-md-4">
                        <h2 className="fw-bold mb-3 text-center ">
                            Sign In
                        </h2>
                        <div className="mb-3">
                            <Form noValidate onSubmit={e => {
                                e.preventDefault()
                                login(name, password, navigate)
                            }}>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="loginLabel">Name</Form.Label>
                                <Form.Control className="loginInput" type="email" placeholder="Enter name"
                                    onChange={a => nameSet(a.target.value)}
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label className="loginLabel">Password</Form.Label>
                                <Form.Control className="loginInput" type="password" placeholder="Password"
                                    onChange={a => passwordSet(a.target.value)}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCheckbox"
                            ></Form.Group>
                            <div className="d-grid">
                                <Button variant="primary" type="submit">
                                    Sign in
                                </Button>
                            </div>
                            </Form>
                            <div className="mt-3">
                            <p className="mb-0  text-center">
                                Don't have an account?{' '}
                                <a onClick={()=>{
                                    navigate('/')
                                }} className="text-primary fw-bold" style={{cursor: "pointer"}}>
                                    Sign Up
                                </a>
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

export default SignIn