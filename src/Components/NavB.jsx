import LogoGrande from '../img/LogoGrande.webp'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavB.css'

function NavB() {
    return (
        <Navbar className='Nav-container sticky-top' expand="lg">
            <Container fluid>
                <Navbar.Brand href="/"><img className='Nav-logo' src={LogoGrande} alt="Logo Indumentaria Taurie" /></Navbar.Brand>
                <Navbar.Toggle style={{backgroundColor: "var(--decoraciones)", boxShadow: "0px 0px 10px var(--decoraciones)"}} aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        
                        className="ms-auto my-lg-0" 
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link className='Nav-item p-3 ms-3' href="/">Inicio</Nav.Link>
                        <Nav.Link className='Nav-item p-3 ms-3' href="#contact">Contacto</Nav.Link>
                        <Nav.Link className='Nav-item p-3 ms-3' href="#about">Sobre nosostros</Nav.Link>
                        <Nav.Link className='Nav-item p-3 ms-3' href="/">Catalogo</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavB