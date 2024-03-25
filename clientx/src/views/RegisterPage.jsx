import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CustomNavbar from '../components/CustomNavbar';
import { useState } from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';

function RegisterPage() {
    const [staff, setStaff] = useState({username: "",email: "", password: "", phoneNumber: "", address: ""})

    const formHandler = (event) => {
        const {name, value} = event.target
        const data = {...staff, [name]: value}
        setStaff(data)
    }

    const register = async (event) => {
        try {
            event.preventDefault()
            const form = await axios({
                method: "POST",
                url: "http://localhost:3000/add-user",
                data: staff,
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            })
            Swal.fire({
                title: "Add User Successful",
                text: "You have added a new staff",
                icon: "success"
              });
        } catch(err) {
            console.log(err)
            Swal.fire({
                title: 'Error!',
                text: err.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        }
    }

  return (
    <div>
        <div className='login-content'>
        <h1>Register New Staff</h1>
            <br />
            <Form onSubmit={register}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" name='username' value={staff.username} onChange={formHandler}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' value={staff.email} onChange={formHandler}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' value={staff.password} onChange={formHandler}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Phone number" name='phoneNumber' value={staff.phoneNumber} onChange={formHandler}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address" name='address' value={staff.address} onChange={formHandler}/>
                </Form.Group>
                <br />
                <div className='log-reg-button'>
                    <Button variant="danger" type="submit" className='log-reg-button-submit'>
                        Register Account
                    </Button>
                </div>    
            </Form>
        </div>
    </div> 
  );
}

export default RegisterPage;