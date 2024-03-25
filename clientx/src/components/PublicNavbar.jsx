import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';

function PublicNavbar() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])

    const handleLogout = () => {
        localStorage.clear()
        navigate("/login")
    }
    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                <Navbar.Brand href="#">Resto-resto</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link><Link to="/public/home">Home</Link></Nav.Link>
                </Nav>
                
                <Col xs="auto">
                    <Nav inline
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavDropdown title="Category" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                            Another action
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Col>

                <Form inline>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                            type="text"
                            placeholder="Search"
                            className=" mr-sm-2"
                            />
                        </Col>
                        <Col xs="auto">
                            <Button type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form>
                </Container>
            </Navbar>
        </>
    )
}

export default PublicNavbar