import { useState } from 'react'
import './AgregadoProducto.css'
import axios from "axios";
import {
    Form,
    InputGroup,
    Button,
    Alert,
} from "react-bootstrap";
import "aos/dist/aos.css"


export default function AgregadoProducto({ productos }) {
    const [validated, setValidated] = useState(false);
    const [input, setInput] = useState({});
    const [alert, setAlert] = useState("");
    const [alertSuccess, setalertSuccess] = useState("")

    const handleSubmit = async (event) => {
        const formulario = event.currentTarget;
        event.preventDefault();
        setValidated(true);
        if (formulario.checkValidity() === false) {
            return event.stopPropagation();
        }
        try {
            await axios.post("productos", input);
            formulario.reset();
            setalertSuccess(`PRODUCTO CREADO EXITOSAMENTE`);
            setValidated(false);
        } catch (error) {
            error.response.data.msg
                ? setAlert(error.response.data.msg)
                : setAlert(error.response.data);
        }
        productos();
        setTimeout(() => { setalertSuccess("") }, 5000);
    };

    const handleChange = (e) => {
        setAlert("");
        const { name, value } = e.target;
        const productoInput = { ...input, [name]: value.toString().toLowerCase() };
        setInput(productoInput);
    };

    return (
        <div className=' mb-5 mt-5'>
            {alert && <Alert variant="danger">{alert}</Alert>}
            {alertSuccess && <Alert variant="success">{alertSuccess}</Alert>}
            <Form className='Form_agregado' noValidate validated={validated} onSubmit={handleSubmit}>
                <section className='Form_inputs_section'>
                    <Form.Group className="Form_agregado_inputs_container" controlId="validationCustom02">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            name="nombre"
                            onChange={(e) => handleChange(e)}
                            required
                            type="text"
                            className="Form_agregado_inputs"
                            maxLength="20"
                        />
                        <Form.Control.Feedback type="invalid">
                            Complete este campo!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Recibido</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="Form_agregado_inputs_container" controlId="validationCustom02">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control
                            name="marca"
                            onChange={(e) => handleChange(e)}
                            required
                            type="text"
                            className="Form_agregado_inputs"
                            maxLength="20"
                        />
                        <Form.Control.Feedback type="invalid">
                            Complete este campo!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Recibido</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="Form_agregado_inputs_container" controlId="validationCustomUsername">
                        <Form.Label>Material</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                minLength="3"
                                name="material"
                                onChange={(e) => handleChange(e)}
                                aria-describedby="inputGroupPrepend"
                                className="Form_agregado_inputs"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Las caracteristicas son obligarorias!
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            min="0"
                            name="precio"
                            onChange={(e) => handleChange(e)}
                            type="number"
                            placeholder="$$$"
                            className="Form_agregado_inputs"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Precio obligatorio!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="Form_agregado_inputs_container" controlId="validationCustomUsername">
                        <Form.Label>Genero</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                minLength="3"
                                name="genero"
                                onChange={(e) => handleChange(e)}
                                aria-describedby="inputGroupPrepend"
                                className="Form_agregado_inputs"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Las caracteristicas son obligarorias!
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="Form_agregado_inputs_container" controlId="validationCustomUsername">
                        <Form.Label>Talle</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                name="talle"
                                onChange={(e) => handleChange(e)}
                                aria-describedby="inputGroupPrepend"
                                className="Form_agregado_inputs"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                El talle es obligatorio!
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="Form_agregado_inputs_container" controlId="validationCustomUsername">
                        <Form.Label>Categoria</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                minLength="3"
                                name="categoria"
                                onChange={(e) => handleChange(e)}
                                aria-describedby="inputGroupPrepend"
                                className="Form_agregado_inputs"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                La caracteristica es obligaroria!
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="Form_agregado_inputs_container" controlId="validationCustom02">
                        <Form.Label>Codigo</Form.Label>
                        <Form.Control
                            name="codigo"
                            onChange={(e) => handleChange(e)}
                            required
                            type="text"
                            className="Form_agregado_inputs"
                            maxLength="20"
                        />
                        <Form.Control.Feedback type="invalid">
                            Complete este campo!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Recibido</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formFile">
                        <Form.Label>Imagen principal (URL)</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                className='Form_agregado_inputs  m-2'
                                name="imgFirst"
                                onChange={(e) => handleChange(e)}
                                type="url"
                                placeholder="url de la imagen"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                La imagen es obligaroria!
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formFile">
                        <Form.Label>Img secundaria (opc)</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                className='Form_agregado_inputs  m-2'
                                name="imgSecond"
                                onChange={(e) => handleChange(e)}
                                type="url"
                                placeholder="url de la imagen"
                                aria-describedby="inputGroupPrepend"
                            />
                            <Form.Control.Feedback type="invalid">
                                La imagen es obligaroria!
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formFile">
                        <Form.Label>Img secundaria (opc)</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                className='Form_agregado_inputs  m-2'
                                name="imgThird"
                                onChange={(e) => handleChange(e)}
                                type="url"
                                placeholder="url de la imagen"
                                aria-describedby="inputGroupPrepend"
                            />
                            <Form.Control.Feedback type="invalid">
                                La imagen es obligaroria!
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formFile">
                        <Form.Label>Img secundaria (opc)</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                className='Form_agregado_inputs m-2'
                                name="imgFourth"
                                onChange={(e) => handleChange(e)}
                                type="url"
                                placeholder="url de la imagen"
                                aria-describedby="inputGroupPrepend"
                            />
                            <Form.Control.Feedback type="invalid">
                                La imagen es obligaroria!
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                </section>

                <Button className="Contact_button mb-4 mt-3" variant='none' type="submit">
                    Agregar
                </Button>
            </Form>
        </div >
    )
}
