import ScrollToTop from '../Components/ScrollToTop'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css'
import { useState } from "react";
import { Alert, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';


function Login({ setToken }) {
  const [input, setInput] = useState({});
  const [alert, setAlert] = useState("");
  const [cargando, setCargando] = useState(false);

  const Navigate = useNavigate();

  const handleChange = (event) => {
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
    } catch (error) {
      error.response.data.msg[0].msg
        ? setAlert(error.response.data.msg[0].msg)
        : setAlert(error.response.data.msg);
    }
  };

  return (
    <>
      <ScrollToTop />
      <div data-aos="fade-up" className="form_container">
        <Form
          onSubmit={handleSubmit}
          className="card mx-auto p-4 mt-5 form_content "
        >
          {alert && <Alert variant="danger">{alert}</Alert>}
          <h1 className="Titulo-login-principal">Ingresa!</h1>
          <Form.Group controlId="formBasicEmail" className="forminputconteiner">
            <Form.Label className="Form-titulos">Ingrese su Email</Form.Label>
            <Form.Control
              className="input_contact"
              name="email"
              onChange={handleChange}
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
              onChange={handleChange}
              type="password"
              placeholder="Ingrese su Password (Min. 6 digitos)"
              required
            />
          </Form.Group>
          <Button className="button_login " variant="msgbut" type="submit">
              {
                cargando
                  ?
                  <Spinner animation="border" variant="danger" />
                  :
                  <h6 style={{margin:"auto", padding:"5px"}}>Enviar</h6>
              }
          </Button>
          <Row>
            <Link style={{ color: "red" }} className="mx-auto mt-2" to="/register">
              ¿No tienes una cuenta?   Registrate!
            </Link>
          </Row>
        </Form>
      </div>
    </>
  )
}

export default Login