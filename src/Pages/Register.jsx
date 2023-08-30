import axios from "axios";
import { useState } from "react";
import {
    Form,
    InputGroup,
    Button,
    Row,
    Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import ScrollToTop from "../Components/ScrollToTop";
import Spinner from 'react-bootstrap/Spinner';

export default function Register({ setToken }) {
    const [validated, setValidated] = useState(false);
    const [input, setInput] = useState({});
    const [alert, setAlert] = useState("");
    const Navigate = useNavigate();
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (event) => {
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
                Navigate('/')
            } else {
                window.alert("Password no coinciden");
            }
        } catch (error) {
            error.response.data.msg
                ? setAlert(error.response.data.msg[0].msg)
                : setAlert(error.response.data);
        }
    };

    const handleChange = (e) => {
        setAlert("");
        const { name, value } = e.target;
        const changedInput = { ...input, [name]: value };
        setInput(changedInput);
    };

    return (
        <>
            <div className="form_container" style={{ marginTop: "-50px" }}>
                <ScrollToTop />
                {alert && <Alert variant="danger">{alert}</Alert>}
                <Form className="form_content" noValidate validated={validated} onSubmit={handleSubmit}>
                    <h3>Registro!</h3>
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
                            minLength="6"
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
                            variant="loginbut"
                            type="submit"
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
                    <Row>
                        <Link style={{ color: "red" }} className="mx-auto mt-2" to="/login">
                            ¿Ya tiene una cuenta? Iniciar sesión
                        </Link>
                    </Row>
                </Form>
            </div>
        </>
    );
}
