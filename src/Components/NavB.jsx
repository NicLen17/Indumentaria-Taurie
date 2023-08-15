import LogoGrande from '../img/LogoGrande.webp'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavB.css'

function NavB() {
    return (
        <Navbar className='Nav-container' expand="lg">
            <Container fluid>
                <Navbar.Brand href="#"><img className='Nav-logo' src={LogoGrande} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link className='Nav-item' href="#action1">Inicio</Nav.Link>
                        <Nav.Link className='Nav-item' href="#action2">About</Nav.Link>
                        <Nav.Link className='Nav-item' href="#action3">Contacto</Nav.Link>
                        <Nav.Link className='Nav-item' href="#action4">Catalogo</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Chomba, pantalon..."
                            className="me-2 Nav-input"
                            aria-label="Search"
                        />
                        <Button variant="outline-warning">Buscar</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavB