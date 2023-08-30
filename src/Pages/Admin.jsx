import { useState, useEffect } from "react";
import axios from "axios";
import {
    Tabs,
    Tab,
    Table,
    Alert,
    Modal,
    Button,
    Form,
    Container,
    InputGroup,
    ToggleButton,
} from "react-bootstrap";
import "./Admin.css";
import { NavLink, useNavigate } from "react-router-dom";
import AgregadoProducto from '../Components/AgregadoProducto';
import ScrollToTop from '../Components/ScrollToTop'

function Admin() {
    const Navigate = useNavigate();
    const localToken = JSON.parse(localStorage.getItem("token"))?.token || "";
    const token = localToken;
    const [products, setProducts] = useState([]);
    const [mensajes, setMensajes] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [imagenes, setImagenes] = useState({});
    const [users, setUsers] = useState([]);
    const [alertSuccess, setalertSuccess] = useState("");
    const [alertSuccessM, setalertSuccessM] = useState("");
    const [alert, setAlert] = useState("");
    const [productEncontrado, setProductEncontrado] = useState({});
    const [mensajeEncontrado, setmensajeEncontrado] = useState({});
    const [consultaEncontrado, setconsultaEncontrado] = useState({});
    const [input, setInput] = useState({});
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [validated, setValidated] = useState(false);

    const numero = 0.03;

    useEffect(() => {
        if (token) {
            const request = async () => {
                axios.defaults.headers = { "x-auth-token": token };
                const { data } = await axios.get("auth");
                if (data.category !== "A") {
                    window.location = "/";
                }
            };
            request();
        } else {
            Navigate('/');
        }
        consulta();
        mensaje();
        productos();
        getListaUsuarios();
    }, [token, Navigate, imagenes]); //se pone "token" como parámetro para que llame a useEffect cada vez que cambie

    const productos = async () => {
        const { data } = await axios.get("productos");
        setProducts(data);
    };
    const mensaje = async () => {
        const { data } = await axios.get("mensajes");
        setMensajes(data);
    };
    const consulta = async () => {
        const { data } = await axios.get("consultas");
        setConsultas(data);
    };

    async function deleteProducto(id) {
        if (window.confirm("Estas seguro que deseas eliminar?")) {
            await axios.delete(`/productos/${id}`);
            productos();
            setalertSuccess("Producto eliminado correctamente");
        }
        setTimeout(() => {
            setalertSuccess("");
        }, 5000);
    }

    async function deleteMensajes(id) {
        if (window.confirm("Estas seguro que deseas eliminar?")) {
            await axios.delete(`mensajes/${id}`);
            mensaje();
            setalertSuccessM("Mensaje eliminado correctamente");
        }
        setTimeout(() => {
            setalertSuccess("");
        }, 5000);
    }
    async function deleteConsulta(id) {
        if (window.confirm("Estas seguro que deseas eliminar?")) {
            await axios.delete(`consultas/${id}`);
            consulta();
            setalertSuccessM("Consulta eliminada correctamente");
        }
        setTimeout(() => {
            setalertSuccess("");
        }, 5000);
    }
    const getListaUsuarios = async () => {
        const { data } = await axios.get("usuarios");
        setUsers(data);
    };
    async function stateUser(id) {
        if (window.confirm("Seguro desea modificar el estado?")) {
            try {
                await axios.put(`usuarios/${id}`);
                setalertSuccess("Estado modificado correctamente");
                getListaUsuarios();
            } catch (error) {
                error.response.data.msg[0].msg
                    ? setalertSuccess(error.response.data.msg[0].msg)
                    : setalertSuccess(error.response.data.msg);
            }
        }
    }
    const updateProduct = async (id) => {
        const productoEncontrado = await products.find((p) => p._id === id);
        setShow(true);
        setProductEncontrado(productoEncontrado)
        setImagenes(productoEncontrado.img)
        setInput(productoEncontrado)
    };

    const handleSubmit = async (event) => {
        const formulario = event.currentTarget;
        event.preventDefault();
        setValidated(true);
        if (formulario.checkValidity() === false) {
            return event.stopPropagation();
        }
        try {
            await axios.put(`/productos/${productEncontrado._id}`, input);
            setShow(false);
            setalertSuccess(`PRODUCTO MODIFICADO EXITOSAMENTE`);
            setValidated(false);
        } catch (error) {
            error.response.data.msg
                ? setAlert(error.response.data.msg)
                : setAlert(error.response.data);
        }
        productos();
    };

    const handleChange = (e) => {
        setAlert("");
        const { name, value } = e.target;
        const productoInput = {
            ...input,
            ...imagenes,
            [name]: value,
        };
        console.log(productoInput)
        setInput(productoInput);
    };

    const borrarImagen = (index) => {
        console.log(productEncontrado.img);
        const removeImg = productEncontrado.img.splice(index, 1);
        setImagenes(removeImg);
    }

    const verMensaje = async (id) => {
        const mensajeEncontrado = await mensajes.find((m) => m._id === id);
        setShow1(true);
        setmensajeEncontrado(mensajeEncontrado)
        setInput(mensajeEncontrado);
    };

    const verConsulta = async (id) => {
        const consultaEncontrado = await consultas.find((c) => c._id === id);
        setShow3(true);
        setconsultaEncontrado(consultaEncontrado)
        setInput(consultaEncontrado);
    };

    const datosProducto = async (id) => {
        const productoEncontrado = await products.find((p) => p._id === id);
        setShow4(true);
        setProductEncontrado(productoEncontrado)
        setImagenes(productoEncontrado.img)
        setInput(productoEncontrado)
    };

    const handleClose = () => setShow1(false);
    const handleClose3 = () => setShow3(false);
    const handleClose4 = () => setShow4(false);


    return (
        <div>
            <ScrollToTop />
            <div className="Tabla-cont mt-5">
                <Tabs
                    fill
                    variant="tabs"
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3 Tabs-adm"
                >
                    <Tab className="colortab" eventKey="profile" title="Usuarios">
                        <div>
                            {alertSuccess && <Alert variant="success">{alertSuccess}</Alert>}
                            <Table className="tabla-admin" responsive striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Funciones</th>
                                        <th>Estado</th>
                                        <th>Nombre</th>
                                        <th>Telefono</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((usuarios) => (
                                            <tr key={usuarios._id}>
                                                <td>
                                                    <ToggleButton
                                                        id="toggle-check"
                                                        type="checkbox"
                                                        variant="primary"
                                                        checked={usuarios.estado}
                                                        value="1"
                                                        onClick={() => stateUser(usuarios._id)}
                                                    >
                                                        Habil./Deshab.
                                                    </ToggleButton>
                                                </td>
                                                <td>
                                                    <ToggleButton
                                                        className="mb-2"
                                                        id="toggle-check"
                                                        type="checkbox"
                                                        variant="outline-success"
                                                        checked={usuarios.estado}
                                                        value="1"
                                                    >
                                                    </ToggleButton>
                                                </td>
                                                <td>{usuarios.nombre}</td>
                                                <td>{usuarios.celular}</td>
                                                <td className="Form-titulos">{usuarios.email}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Tab>
                    <Tab className="colortab" eventKey="home" title="Productos">
                        <div>
                            <AgregadoProducto productos={productos} />
                            {alertSuccess && <Alert variant="success">{alertSuccess}</Alert>}
                            <Table className="tabla_admin" responsive striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Patente</th>
                                        <th>Ganancia</th>
                                        <th>Precio</th>
                                        <th>Categoria</th>
                                        <th>Modelo</th>
                                        <th>Marca</th>
                                        <th>Categoria</th>
                                        <th>Imagen</th>
                                        <th>Funciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((product) => (
                                            <tr key={product._id}>
                                                <td>{product.patente}</td>
                                                <td>${product.precio * numero}</td>
                                                <td>${product.precio}</td>
                                                <td>{product.categoria}</td>
                                                <td>{product.modelo}</td>
                                                <td>{product.marca}</td>
                                                <td>{product.categoria}</td>
                                                <td>
                                                    <img loading='lazy' style={{ width: "150px", height: "120px", borderRadius: "10px", objectFit: "cover", border: "1px solid red" }} src={product.imgFirst} alt="" />
                                                </td>
                                                <td>
                                                    <button
                                                        style={{ width: "90px" }}
                                                        className="btn btn-warning mr-1"
                                                        onClick={() => datosProducto(product._id)}
                                                    >
                                                        Datos
                                                    </button>
                                                    <button
                                                        style={{ width: "90px" }}
                                                        className="btn btn-success mr-1"
                                                        onClick={() => updateProduct(product._id)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <NavLink
                                                        className="btn btn-primary"
                                                        style={{ textDecorationLine: "none", width: "90px" }}
                                                        to={`/individual/${product._id}`}
                                                        exact
                                                        as={NavLink}
                                                    >
                                                        Ver
                                                    </NavLink>
                                                    <button
                                                        className="btn btn-danger"
                                                        style={{ textDecorationLine: "none", width: "90px" }}
                                                        onClick={() => deleteProducto(product._id)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Tab>
                    <Tab eventKey="contact" title="Mensajeria">
                        <div>
                            {alertSuccessM && (<Alert variant="success">{alertSuccessM}</Alert>)}
                            <Table className="tabla-admin" responsive striped bordered hover variant="dark">
                                <thead>
                                    <tr className="tabla-admin">
                                        <th>Nombre y apellido</th>
                                        <th>correo electronico</th>
                                        <th>telefono</th>
                                        <th>mensaje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mensajes.map((msj) => (
                                        <tr key={msj.id}>
                                            <td>{msj.nombreyapellido}</td>
                                            <td className="Form-titulos">
                                                {msj.email}
                                            </td>
                                            <td>{msj.tel}</td>
                                            <td>
                                                <button
                                                    className="btn btn-success mr-1 ms-2"
                                                    onClick={() => verMensaje(msj._id)}
                                                >
                                                    Ver Mensaje
                                                </button>{" "}
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => deleteMensajes(msj._id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>
                    <Tab eventKey="consult" title="Consultas">
                        <div>
                            {alertSuccessM && (<Alert variant="success">{alertSuccessM}</Alert>)}
                            <Table className="tabla-admin" responsive striped bordered hover variant="dark">
                                <thead>
                                    <tr className="tabla-admin">
                                        <th>Nombre y apellido</th>
                                        <th>correo electronico</th>
                                        <th>telefono</th>
                                        <th>mensaje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {consultas.map((cst) => (
                                        <tr key={cst.id}>
                                            <td>{cst.producto}</td>
                                            <td className="Form-titulos">
                                                {cst.email}
                                            </td>
                                            <td>{cst.tel}</td>
                                            <td>
                                                <button
                                                    className="btn btn-success mr-1 ms-2"
                                                    onClick={() => verConsulta(cst._id)}
                                                >
                                                    Ver Consulta
                                                </button>{" "}
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => deleteConsulta(cst._id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>
                </Tabs>
            </div>
            {
                <Modal show={show} backdrop="static" keyboard={false}>
                    <Modal.Header
                        style={{ backgroundColor: "black", border: "1px solid var(--decoraciones)", color: "white" }}
                        className="Header-edit"
                        closeButton={() => setShow(false)}
                        onClick={() => { setShow(false); setInput({}); setAlert(""); setValidated(false) }}
                    >
                        <Modal.Title className="Titulo-editar">
                            Editar el producto {productEncontrado.nombre} {productEncontrado.marca}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="Form-editar" style={{ width: "100%", backgroundColor: "black", border: "1px solid var(--decoraciones)" }}>
                        <Container>
                            {alert && <Alert variant="danger">{alert}</Alert>}
                            <Form style={{ backgroundColor: "black", color: "white" }} noValidate validated={validated} onSubmit={handleSubmit}>

                                <section className='Form_inputs_admin'>
                                    <Form.Group className="Form_agregado_inputs_container" controlId="validationCustom02">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            name="nombre"
                                            onChange={(e) => handleChange(e)}
                                            defaultValue={productEncontrado.nombre}
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
                                            defaultValue={productEncontrado.marca}
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
                                                defaultValue={productEncontrado.material}
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
                                            defaultValue={productEncontrado.precio}
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
                                                defaultValue={productEncontrado.genero}
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
                                                defaultValue={productEncontrado.talle}
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
                                                defaultValue={productEncontrado.categoria}
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
                                            defaultValue={productEncontrado.codigo}
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
                                                defaultValue={productEncontrado.imgFirst}
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
                                                defaultValue={productEncontrado.imgSecond}
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
                                                defaultValue={productEncontrado.imgThird}
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
                                                defaultValue={productEncontrado.imgFourth}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                La imagen es obligaroria!
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                </section>

                                <div className="d-flex flex-wrap">
                                    {productEncontrado.img?.map((i, index) => (
                                        <div key={productEncontrado.id}>
                                            <Button variant="btn btn-white" style={{ position: "absolute" }} onClick={() => borrarImagen(index)}><img src="https://icongr.am/fontawesome/remove.svg?size=15&color=currentColor" alt="cerrar" /></Button>
                                            <img style={{ width: "200px", height: "200px", objectFit: "contain", backgroundColor: "white", border: "1px solid var(--decoraciones)", margin: "15px 0px 15px 0px" }} src={i} alt="imagen del vehiculo" />
                                        </div>
                                    ))}
                                </div>
                                <Modal.Footer style={{ borderTop: "1px solid var(--decoraciones)" }}>
                                    <Button
                                        variant="danger"
                                        onClick={() => { setShow(false); setInput({}); setAlert(""); setValidated(false) }}
                                    >
                                        Cerrar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        type="submit"
                                    >
                                        Listo
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </Container>
                    </Modal.Body>
                </Modal>
            }

            {
                <div>
                    <Modal
                        show={show1}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header className="form_agregado" closeButton>
                            <Modal.Title className="form_agregado">Mensaje</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="form_agregado">
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <h3 style={{ borderBottom: "1px solid white" }}>Datos del cliente:</h3>
                                Nombre: {mensajeEncontrado.nombreyapellido}
                                <br />
                                Mail: {mensajeEncontrado.email}
                                <br />
                                Tel: {mensajeEncontrado.tel}
                                <br />
                                <br />
                                Mensaje: <br />
                                {mensajeEncontrado.mensaje}
                                <br /><br />
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="form_agregado">
                            <Button variant="danger" className="Editar-boton" onClick={handleClose}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            }

            {
                <div>
                    <Modal
                        show={show3}
                        onHide={handleClose3}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header className="form_agregado" closeButton>
                            <Modal.Title className="Form-titulos">Consulta</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="form_agregado">
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <h3 style={{ borderBottom: "1px solid white" }}>Datos del cliente:</h3>
                                Nombre: {consultaEncontrado.nombreyapellido}
                                <br />
                                Mail: {consultaEncontrado.email}
                                <br />
                                Tel: {consultaEncontrado.tel}
                                <br />
                                <br />
                                Producto: {consultaEncontrado.producto}
                                <br />
                                <br />
                                Consulta: <br />
                                {consultaEncontrado.mensaje}
                                <br /><br />
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="form_agregado">
                            <Button variant="danger" className="Editar-boton" onClick={handleClose3}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            }

            {
                <div>
                    <Modal
                        show={show4}
                        onHide={handleClose4}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header style={{ backgroundColor: "black", color: "white", border: "1px solid var(--decoraciones)", fontWeight: "bold" }} className="form_agregado" closeButton>
                            <Modal.Title className="Form-titulos">Datos del producto:</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{border: "1px solid var(--decoraciones)", fontWeight: "bold"}} className="form_agregado">
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                Nombre: {productEncontrado.nombre}
                                <br />
                                Marca: {productEncontrado.marca}
                                <br />
                                Genero: {productEncontrado.genero}
                                <br />
                                Talle: {productEncontrado.talle}
                                <br />
                                Material: {productEncontrado.material}
                                <br />
                                Precio: ${productEncontrado.precio}
                                <br />
                                Codigo: {productEncontrado.codigo}
                                <br />
                                Categoria: {productEncontrado.categoria}
                                <br />
                            </div>
                        </Modal.Body>
                        <Modal.Footer style={{border: "1px solid var(--decoraciones)", backgroundColor: "black"}} className="form_agregado">
                            <Button variant="warning" className="Editar-boton" onClick={handleClose4}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            }
        </div>
    );
}

export default Admin;
