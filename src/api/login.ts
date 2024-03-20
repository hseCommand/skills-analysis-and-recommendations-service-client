import { NavigateFunction } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string,
  name: string,
  roles: []
}

export function login(name: string, password: string, navigate: NavigateFunction) {
  fetch("http://localhost:8080/auth/token", {
    method: "POST",
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    }, body: JSON.stringify({
      name: name,
      password: password
    })
  }).then(res => res.text())
    .then(response => {
      localStorage.setItem('token', response)
      const decoded = jwtDecode<JwtPayload>(response);
      localStorage.setItem('id', decoded.id)
      localStorage.setItem('name', decoded.name)
      localStorage.setItem('roles', JSON.stringify(decoded.roles))

      navigate("/profiles")
    })
    .catch(er => {
      console.log(er.message)
    })
}