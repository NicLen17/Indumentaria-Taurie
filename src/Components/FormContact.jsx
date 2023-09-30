import axios from 'axios';
import './FormContact.css'
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

function FormContact() {
    const [validated, setValidated] = useState(false);
    const [input, setInput] = useState({});
    const [alert, setAlert] = useState("");
    const [alertSuccess, setalertSuccess] = useState("")

    const handleSubmit = async (e) => {
        const formulario = e.currentTarget;
        e.preventDefault();
        setValidated(true);
        if (formulario.checkValidity() === false) {
            return e.stopPropagation();
        }
        try {
            await axios.post("mensajes", input);
            formulario.reset()
            setalertSuccess("Mensaje enviado. Gracias en breve le responderemos!");
            setTimeout(() => {
                setalertSuccess("");
            }, 2000);
            setValidated(false)
        } catch (error) {
            error.response.data.msg
                ? setAlert(error.response.data.msg)
                : setAlert("este error");
        }
        setTimeout(() => {
            setAlert("");
        }, 2000);
    };
    const handleChange = (e) => {
        setAlert("");
        const { name, value } = e.target;
        const mensaje = { ...input, [name]: value };
        setInput(mensaje);
    }

    return (
        <>
            <h1 data-aos="fade" data-aos-once="true" style={{ color: "white", textAlign: "center", margin: "-50px 0px 60px 0px", textShadow: "white 1px 0 15px", fontSize: "3rem" }}>Dejanos un mensaje</h1>
            <div data-aos="fade-down" data-aos-once="true" data-aos-duration="600" data-aos-delay="200"  className='contact_section'>
                <section className='contact_form'>
                    {alert && <Alert variant="danger">{alert}</Alert>}
                    <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group
                            style={{ marginTop: "15px" }}
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Nombre y Apellido</Form.Label>
                            <Form.Control className="input_contact" type="name" placeholder="Nombre y Apellido" required name="nombreyapellido" maxLength="50" onChange={(e) => handleChange(e)} />
                            <Form.Control.Feedback type="invalid">
                                Se requiere nombre y apellido!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Recibido</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            style={{ marginTop: "15px" }}
                            controlId="exampleForm.ControlInput1"       >
                            <Form.Label>Correo electronico</Form.Label>
                            <Form.Control className="input_contact" type="email" placeholder="Correo@example.com" required maxLength="30" name="email" onChange={(e) => handleChange(e)} />
                            <Form.Control.Feedback type="invalid">
                                Se requiere correo Electronico!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Recibido</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            style={{ marginTop: "15px" }}
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control className="input_contact" maxLength="10" type="number" placeholder="codigo de area + numero sin 15" required max="999999999999" name="tel" onChange={(e) => handleChange(e)} />
                            <Form.Control.Feedback type="invalid">
                                Se requiere telefono valido!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Recibido</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            style={{ marginTop: "15px" }}
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Mensaje</Form.Label>
                            <Form.Control className="input_contact" minLength="20" maxLength="300" style={{ maxHeight: "200px" }} as="textarea" placeholder="Mensaje" required rows={3} name="mensaje" onChange={(e) => handleChange(e)} />
                            <Form.Control.Feedback type="invalid">
                                Se requiere mensaje y un minimo de 20 caracteres!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Recibido</Form.Control.Feedback>
                        </Form.Group>
                        <Button className="contact_button mb-3" variant="none" type="submit"> Enviar </Button>
                        {alertSuccess && <Alert variant="dark">{alertSuccess}</Alert>}
                    </Form>
                </section>
            </div>
        </>
    )
}

export default FormContact