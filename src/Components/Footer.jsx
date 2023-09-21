import './Footer.css'
import Logo from '../img/Logo.webp'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Alert, Button, Form, InputGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import MercadoPago from '../img/MercadoPago.webp'
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


export default function Footer({
    userName,
    logout,
    setToken,
}) {

    const [validated, setValidated] = useState(false);
    const [input, setInput] = useState({});
    const [alert, setAlert] = useState("");
    const Navigate = useNavigate();
    const [cargando, setCargando] = useState(false);

    const toolTipCredito = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Tarjetas de credito
        </Tooltip>
    );

    const mercadoPago = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Mercado Pago
        </Tooltip>
    );

    const toolTipEfectivoTransferencia = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Se acepta efectivo y transferencia
        </Tooltip>
    );

    const toolTipoEnvio = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Envios a todo el pais
        </Tooltip>
    );

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

    return (
        <div>
            <footer className="footer-distributed">
                <div className="footer-left">
                    <p className="footer-links">
                        <Link as={NavLink} to={"/"} className="mt-2 items-footer">Inicio</Link>
                        <br />
                        <Link as={NavLink} to={"/productos"} className="mt-2 items-footer">Catalogo</Link>
                        <br />
                        <Link as={NavLink} to={"/contact"} className="mt-2 items-footer">Contacto</Link>
                        <br />
                        {!userName && (
                            <>
                                <Button variant='none' style={{ cursor: "pointer" }} className='items-footer p-3' onClick={handleShowLogin}><img loading='lazy' src="https://icongr.am/clarity/login.svg?size=40&color=ffffff" alt="Imagen de entrada referente al login" /></Button>
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
                            <Button className='items-footer p-3' variant='none' onClick={logout} >
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
                                            style={{ margin: "auto", width: "460px", fontWeight: "bold" }}
                                            className="mt-3"
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
                    </p>
                    <div className="footer-icons">
                        <a href="mailto:indumtaurie@gmail.com?Subject=Consulta%20desde%20la%20pagina%20web.%20"><img loading='lazy' className='Redes-footer' src="https://icongr.am/simple/gmail.svg?size=128&color=currentColor&colored=true " alt="Logo de Mail - Taurie" /></a>
                        <a target="blank" href="https://www.instagram.com/indumentaria_taurie/"><img loading='lazy' className='Redes-footer' src="https://icongr.am/fontawesome/instagram.svg?size=128&color=ff24f8" alt="Logo de instagram - Taurie" /></a>
                        <a target="blank" href="https://wa.me/543815768548?text=Buenos%20días,%20vengo%20desde%20la%20pagina%20web%20para%20realizar%20una%20consulta.%20"><img loading='lazy' className='Redes-footer' src="https://icongr.am/fontawesome/whatsapp.svg?size=30&color=1dcd3b" alt="Logo de whatsapp - Taurie" /></a>
                        <a target="blank" href="https://www.facebook.com/profile.php?id=100077452835748"><img loading='lazy' className='Redes-footer' src="https://icongr.am/fontawesome/facebook-square.svg?size=128&color=4240d4" alt="Logo de facebook - Taurie" /></a>
                    </div>
                </div>
                <div className="footer-right">
                    <div className='footer-paid'>
                    <OverlayTrigger
                            placement="top"
                            delay={{ show: 120, hide: 400 }}
                            overlay={mercadoPago}
                        >
                            <li className='footer-paid-element'><img style={{ width: "50px"}} src={MercadoPago} alt="" /></li>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 120, hide: 400 }}
                            overlay={toolTipCredito}
                        >
                            <li className='footer-paid-element'><img src="https://icongr.am/clarity/credit-card.svg?size=50&color=000000" alt="Icono de tarjeta de credito - Taurie" /></li>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 120, hide: 400 }}
                            overlay={toolTipEfectivoTransferencia}
                        >
                            <li className='footer-paid-element'><img src="https://icongr.am/fontawesome/dollar.svg?size=50&color=000000" alt="Logo de dolar - Taurie" /></li>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 120, hide: 400 }}
                            overlay={toolTipoEnvio}
                        >
                            <li className='footer-paid-element'><img src="https://icongr.am/fontawesome/truck.svg?size=50&color=000000" alt="Logo de transporte - Taurie" /></li>
                        </OverlayTrigger>
                    </div>
                    <div className="mapa-footer">
                        <img loading='lazy' src={Logo} alt="Indumentaria Taurie - Ropa - Remera" />
                    </div>
                </div>
            </footer>
        </div>
    )
}
