import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { login } from './api/login';
import './style/login.css'

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
                login(name, password, navigate)
            }
          })
          .catch(er=>{
            console.log(er.message)
        })
    }

    return(
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xl={4} xs={12}>
                    <Card className="px-4">
                    <Card.Body>
                        <div className="mb-3 mt-md-4">
                        <h2 className="fw-bold mb-3 text-center ">
                            Регистрация
                        </h2>
                        <div className="mb-3">
                            <Form noValidate onSubmit={e => {
                                e.preventDefault()
                                register()
                                // console.log(name, password, email)
                            }}>
                            <Form.Group className="mb-3" controlId="Name">
                                <Form.Label className="loginLabel">Логин</Form.Label>
                                <Form.Control type="text" className="loginInput" placeholder="Введите логин"
                                    onChange={a => nameSet(a.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="loginLabel">Адрес электронной почты</Form.Label>
                                <Form.Control type="email" className="loginInput" placeholder="Введите email"
                                    onChange={a => emailSet(a.target.value)}
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label className="loginLabel">Пароль</Form.Label>
                                <Form.Control type="password" className="loginInput" placeholder="Введите пароль"
                                    onChange={a => passwordSet(a.target.value)}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCheckbox"
                            ></Form.Group>
                            <div className="mt-2 d-grid">
                                <Button variant="primary" type="submit">
                                    Создать аккаунт
                                </Button>
                            </div>
                            </Form>
                            <div className="mt-3">
                            <p className="mb-0  text-center">
                                Уже есть аккаунт?{' '}
                                <a onClick={()=>{
                                    navigate('/signin')
                                }} className="text-primary fw-bold" style={{cursor: "pointer"}}>
                                    Войти
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

export default SignUp