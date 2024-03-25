import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function CustomNavbar() {
  const navigate = useNavigate();

  const goToAdd = (event) => {
    event.preventDefault();
    navigate('/add-cuisine');
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/cuisines">Resto-resto</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/cuisines">Home</Nav.Link>
            <Nav.Link href="/categories">Categories</Nav.Link>
            <Nav.Link href="/register">Register Staff</Nav.Link>
            <Nav.Link href="/add-cuisine">Add Menu</Nav.Link>
            <Nav.Link href="" style={{ right: '7%', position: 'absolute' }} onClick={handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
