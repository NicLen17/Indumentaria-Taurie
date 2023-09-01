import LogoGrande from '../img/LogoGrande.webp'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavB.css'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Alert, Button, Form, InputGroup, Modal, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';


function NavB({
    userName,
    userCategory,
    logout,
    favorito,
    eliminarFavorito,
    setToken,
}) {

    const [validated, setValidated] = useState(false);
    const [input, setInput] = useState({});
    const [alert, setAlert] = useState("");
    const Navigate = useNavigate();
    const [cargando, setCargando] = useState(false);

    const handleSubmitRegister = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        setCargando(true);
        setValidated(true);
        if (form.checkValidity() === false) {
            setCargando(false);
            return event.stopPropagation();
        }
        try {
            if (input.password === input.password1) {
                const { data } = await axios.post("auth/register", input);
                localStorage.setItem("token", JSON.stringify(data));
                setToken(data.token);
                Navigate('/');
                setCargando(false);
                handleCloseRegister();
            } else {
                window.alert("Password no coinciden");
            }
        } catch (error) {
            error.response.data.msg
                ? setAlert(error.response.data.msg[0].msg)
                : setAlert(error.response.data);
            setCargando(false);
        }
    };

    const handleChange = (e) => {
        setAlert("");
        const { name, value } = e.target;
        const changedInput = { ...input, [name]: value };
        setInput(changedInput);
    };


    const handleChangeLogin = (event) => {
        setAlert("");
        const { value, name } = event.target;
        const newInput = { ...input, [name]: value };
        setInput(newInput);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setCargando(true);
        try {
            const { data } = await axios.post("auth/login", input);
            localStorage.setItem("token", JSON.stringify(data));
            setToken(data.token);
            Navigate('/');
            location.reload();
            setCargando(false);
        } catch (error) {
            error.response.data.msg[0].msg
                ? setAlert(error.response.data.msg[0].msg)
                : setAlert(error.response.data.msg);
            setCargando(false);
        }
    };

    const [show, setShow] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleOpenClose = () => {
        handleShowRegister();
        handleCloseLogin();
    }

    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Navbar className='Nav-container sticky-top' expand="lg">
            <Container fluid>
                <Navbar.Brand href="/"><img className='Nav-logo' src={LogoGrande} alt="Logo Indumentaria Taurie" /></Navbar.Brand>
                <Navbar.Toggle style={{ backgroundColor: "var(--decoraciones)", boxShadow: "0px 0px 10px var(--decoraciones)" }} aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="ms-auto my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={NavLink} activeClassName="active" to={"/"} className='Nav-item p-3 ms-3'>Inicio</Nav.Link>
                        <Nav.Link as={NavLink} activeClassName="active" className='Nav-item p-3 ms-3' to={"/contact"}>Contacto</Nav.Link>
                        <Nav.Link as={NavLink} activeClassName="active" to={"/productos"} className='Nav-item p-3 ms-3'>Catalogo</Nav.Link>
                        {userName && userCategory && (
                            <Nav.Link as={NavLink} activeClassName="active" to={"/admin"} className='Nav-item p-3 ms-3'>
                                Administracion
                            </Nav.Link>)}
                        {userName && (
                            <Nav.Link className='Nav-item p-3 ms-3' as={NavLink} to="/perfil" activeClassName="none" >
                                <img
                                    loading='lazy'
                                    src="https://icongr.am/fontawesome/user.svg?size=35&color=ffffff"
                                    alt="imagen de logo de perfil"
                                />{" "}
                            </Nav.Link>
                        )}
                        {userName && (
                            <>
                                <Button variant='none' style={{ cursor: "pointer" }} className='Nav-item p-3 ms-3 mx-auto' onClick={handleShow}><img loading='lazy' src="https://icongr.am/entypo/heart.svg?size=40&color=ffffff" alt="Imagen de corazon referente a productos favoritos" /></Button>
                                <Modal style={{ color: "white" }} show={show} onHide={handleClose}>
                                    <Modal.Header style={{ backgroundColor: "black", border: "1px solid var(--decoraciones)" }} closeButton>
                                        <Modal.Title>Productos favoritos</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body style={{ backgroundColor: "black", border: "1px solid var(--decoraciones)" }}>
                                        {favorito.length === 0 && (
                                            <h4 key={favorito.id} className="m-5">No hay productos en la lista</h4>
                                        )}
                                        {
                                            favorito.map((fav) => (
                                                <div style={{ border: "1px solid var(--decoraciones)", margin: "10px 10px 10px 10px", boxShadow: "0px 0px 10px var(--decoraciones)" }} key={fav.id}>
                                                    <div style={{ textTransform: "capitalize", marginBottom: "0px", display:"flex", justifyContent: "space-around", alignItems: "center" }}> <img style={{ border: "1px solid var(--decoraciones)", margin: "10px" }} width={100} src={fav.imgFirst} alt="" /> {fav.modelo} {fav.marca} <Button variant='danger' onClick={() => eliminarFavorito(fav._id)}>Eliminar</Button>  <Nav.Link as={NavLink} to={`/individual/${fav._id}`}><Button onClick={handleClose} variant='primary'>Ver</Button></Nav.Link> </div>
                                                </div>
                                            ))
                                        }
                                    </Modal.Body>
                                    <Modal.Footer style={{ backgroundColor: "black", border: "1px solid var(--decoraciones)" }}>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Cerrar
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                        )}
                        {!userName && (
                            <>
                                <Button variant='none' style={{ cursor: "pointer" }} className='Nav-item p-3 ms-3 mx-auto' onClick={handleShowLogin}><img loading='lazy' src="https://icongr.am/clarity/login.svg?size=40&color=ffffff" alt="Imagen de entrada referente al login" /></Button>
                                <Modal style={{ color: "white" }} show={showLogin} onHide={handleCloseLogin}>
                                    <Modal.Header style={{ backgroundColor: "black", border: "1px solid var(--decoraciones)" }} closeButton>
                                        <Modal.Title style={{ fontWeight: "bold" }}>Login</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body style={{ backgroundColor: "black", border: "1px solid var(--decoraciones)" }}>
                                        <Form
                                            onSubmit={handleSubmit}
                                        >
                                            {alert && <Alert variant="danger">{alert}</Alert>}
                                            <Form.Group controlId="formBasicEmail" className="forminputconteiner">
                                                <Form.Label className="Form-titulos">Ingrese su Email</Form.Label>
                                                <Form.Control
                                                    className="input_contact"
                                                    name="email"
                                                    onChange={handleChangeLogin}
                                                    type="email"
                                                    placeholder="mail@gmail.com"
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label className="Form-titulos mt-4">Ingrese su Contraseña</Form.Label>
                                                <Form.Control
                                                    className="input_contact"
                                                    name="password"
                                                    onChange={handleChangeLogin}
                                                    type="password"
                                                    placeholder="Ingrese su Password (Min. 6 digitos)"
                                                    required
                                                />
                                            </Form.Group>
                                            <Button className="mt-3 m-auto" variant="warning" type="submit">
                                                {
                                                    cargando
                                                        ?
                                                        <Spinner animation="border" variant="secondary" />
                                                        :
                                                        <h6 style={{ margin: "auto", padding: "5px" }}>Enviar</h6>
                                                }
                                            </Button>
                                            <Row>
                                                <Button variant='warning' onClick={handleOpenClose} style={{ color: "var(--decoraciones)", fontSize: "bold", width: "300px", backgroundColor: "black" }} className="m-auto mt-3">
                                                    ¿No tienes una cuenta? Registrate!
                                                </Button >
                                            </Row>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer style={{ backgroundColor: "black", border: "1px solid var(--decoraciones)" }}>
                                        <Button variant="secondary" onClick={handleCloseLogin}>
                                            Cerrar
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                        )}
                        {userName && (
                            <Button className='Nav-item p-3 ms-3 mx-auto' variant='none' onClick={logout} >
                                <img src="https://icongr.am/clarity/logout.svg?size=40&color=ffffff" alt="Imagen de salida referente a Log out" />
                            </Button>
                        )}

                        <Modal style={{ color: "white" }} show={showRegister} onHide={handleCloseRegister}>
                            <Modal.Header style={{ backgroundColor: "black", border: "1px solid var(--decoraciones)" }} closeButton>
                                <Modal.Title style={{ fontWeight: "bold" }}>Registro</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ backgroundColor: "black", border: "1px solid var(--decoraciones)" }}>
                                {alert && <Alert variant="danger">{alert}</Alert>}
                                <Form className="form_content" noValidate validated={validated} onSubmit={handleSubmitRegister}>
                                    <Form.Group
                                        controlId="validationCustom01"
                                    >
                                        <Form.Label className="Form-titulos">Nombre de usuario</Form.Label>
                                        <Form.Control
                                            name="nombre"
                                            onChange={(e) => handleChange(e)}
                                            required
                                            type="text"
                                            placeholder="Juanma"
                                            maxLength="25"
                                            minLength="4"
                                            className="input_contact"
                                        />
                                        <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="Form-titulos">Celular</Form.Label>
                                        <Form.Control
                                            name="celular"
                                            required
                                            onChange={(e) => handleChange(e)}
                                            type="text"
                                            min="0"
                                            maxLength="15"
                                            pattern="[0-9,.]+"
                                            placeholder="381 - - - - "
                                            className="input_contact"
                                        />
                                        <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        controlId="validationCustom02"
                                    >
                                        <Form.Label className="Form-titulos">Email</Form.Label>
                                        <Form.Control
                                            name="email"
                                            onChange={(e) => handleChange(e)}
                                            required
                                            type="email"
                                            placeholder="mail@gmail.com"
                                            maxLength="40"
                                            className="input_contact"
                                        />
                                        <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        controlId="validationCustomUsername"
                                    >
                                        <Form.Label className="Form-titulos">Contraseña</Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                minLength="6"
                                                name="password"
                                                onChange={(e) => handleChange(e)}
                                                type="password"
                                                placeholder="******"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                className="input_contact"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Password requiere un mínimo de 6 caracteres!
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group
                                        className="reginputconteiner"
                                        controlId="validationCustomUsername"
                                    >
                                        <Form.Label className="Form-titulos">Confirmar contraseña</Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                minLength="6"
                                                name="password1"
                                                onChange={(e) => handleChange(e)}
                                                type="password"
                                                placeholder="******"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                className="input_contact"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Password requiere un mínimo de 6 caracteres!
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Row>
                                        <Button
                                            style={{ margin: "auto" }}
                                            className="mt-3 button_login"
                                            variant="warning"
                                            type="submit"
                                            onSubmit={handleCloseRegister}
                                        >
                                            {
                                                cargando
                                                    ?
                                                    <Spinner animation="border" variant="danger" />
                                                    :
                                                    <h6 style={{ margin: "auto", padding: "5px" }}>Registrarme</h6>
                                            }
                                        </Button>
                                    </Row>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer style={{ backgroundColor: "black", border: "1px solid var(--decoraciones)" }}>
                                <Button variant="secondary" onClick={handleCloseRegister}>
                                    Cerrar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavB