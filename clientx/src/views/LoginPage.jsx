import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function LoginPage() {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleEmail(e) {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    // console.log(e)

    const user = { email: e.target[0].value, password: e.target[1].value };

    try {
      const { data } = await axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: user,
      });
      console.log(data);
      localStorage.Authorization = `Bearer ${data.accessToken}`;
      navigate('/cuisines');
      Swal.fire({
        title: 'Login Success',
        text: 'Welcome!',
        icon: 'success',
      });
      console.log('login success');
      console.log(data);
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Error!',
        text: err,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }

  //     const formHandler = (event) => {
  //         const {name, value} = event.target
  //         const data = {...user, [name]: value}
  //         setUser(data)
  //     }

  //     const login = async (event) => {
  //         try {
  //             event.preventDefault()
  // const form = await axios({
  //     method: "POST",
  //     url: "http://localhost:3000/login",
  //     data: user
  // })
  // localStorage.Authorization = `Bearer ${form.data.access_token}`
  // navigate("/cuisines")
  // Swal.fire({
  //     title: "Login Success",
  //     text: "Welcome!",
  //     icon: "success"
  //   });
  //     } catch(err) {
  //         console.log(err)
  //         Swal.fire({
  //             title: 'Error!',
  //             text: err,
  //             icon: 'error',
  //             confirmButtonText: 'Ok'
  //           })
  //     }
  // }

  return (
    <div className="login-content">
      <h1>LOGIN PAGE</h1>
      <Form onSubmit={handleEmail}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <br />
        <div className="log-reg-button">
          <Button variant="danger" type="submit" className="log-reg-button-submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default LoginPage;
