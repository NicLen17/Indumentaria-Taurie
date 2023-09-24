import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProdIndividual.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import ScrollToTop from '../Components/ScrollToTop';
import ModalTransferencia from '../Components/ModalTransferencia';
import { Form } from "react-bootstrap";

function ProdPrincipal({ userName, favorito, setFavorito }) {
    const { id } = useParams();
    const [products, setproducts] = useState({});
    const [cargando, setCargando] = useState(true);
    const [cargaBoton, setCargaBoton] = useState(false);
    const [alert, setAlert] = useState("");
    const [alertFail, setAlertFail] = useState("");
    const [preferenceId, setPreferenceId] = useState(null);
    const [transferenciaShow, setTransferenciaShow] = useState(false);
    const [cantidad, setCantidad] = useState(1);
    const [validated, setValidated] = useState(false);
    const [input, setInput] = useState({});
    const [alertSuccess, setalertSuccess] = useState("")

    const cantidadSelect = products.stock;

    const opcionesStock = Array.from({ length: cantidadSelect }, (_, index) => index + 1);

    //Mercado pago

    initMercadoPago("APP_USR-7ae5cfee-d433-4501-a12a-da4a24d4097e");


    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:4000/create_preference", {
                description: products.nombre,
                price: products.precio,
                quantity: cantidad,
                currency_id: "ARS",
            });
            const { id } = response.data;
            return id;
        } catch (error) {
            console.log(error);
        }
    };

    const handleBuy = async () => {
        setCargaBoton(true);
        const id = await createPreference();
        if (id) {
            setCargaBoton(false)
            setAlert("")
            setAlertFail("")
            setPreferenceId(id);
        }
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Todas las demas funcionalidades

    useEffect(() => {
        const producto = async () => {
            const { data } = await axios.get(`productos/${id}`);
            setproducts(data);
            setCargando(false);
        }
        producto()
    }, [id])

    const handleCantidad = (e) => {
        const cantidadPagar = e.target.value;
        setCantidad(cantidadPagar);
        handleChange(e)
    };

    const agregarFavorito = () => {
        if (!favorito.find(p => p._id === products._id)) {
            const agregado = [...favorito, products];
            setFavorito(agregado);
            setAlert(`Producto agregado a lista de favoritos!`);
            setTimeout(() => {
                setAlert("");
            }, 2000);
        }
        else {
            setAlertFail("Este producto ya se encuentra en favoritos!");
            setTimeout(() => {
                setAlertFail("");
            }, 2000);
        }
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Agregar a favoritos
        </Tooltip>
    );

    //Formulario de venta

    useEffect(() => {
        const producto = async () => {
            const { data } = await axios.get(`productos/${id}`);
            setproducts(data);
        }
        producto()
    }, [id])

    const handleSubmit = async (e) => {
        const formulario = e.currentTarget;
        e.preventDefault();
        setValidated(true);
        if (formulario.checkValidity() === false) {
            return e.stopPropagation();
        }
        try {
            await axios.post("consultas", input);
            formulario.reset();
            setalertSuccess("Datos guardados, selecciona medio de pago");
            setTimeout(() => {
                setalertSuccess("");
            }, 2000);
            setValidated(false);
            handleBuy()
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
        const consulta = { ...input, [name]: value };
        setInput(consulta);
    }


    localStorage.setItem("agregarcarrito", JSON.stringify(favorito));

    return (
        <>
            <ScrollToTop />
            <div className='individual_container'>
                <div data-aos="fade-down" data-aos-delay="200" data-aos-once="true" data-aos-duration="1400" key={products.id} className='individual_content'>
                    {
                        cargando
                            ?
                            <div style={{ margin: "auto" }} className='filter_spinner_individual'>
                                <Spinner className='filter_spinner' variant="warning" />
                                <p className='filter_spinner_text'>Cargando tu producto...</p>
                            </div>
                            :
                            <>
                                {
                                    <>
                                        <div className='individual_content_left'>
                                            <div className='indivudual_img'>
                                                <img loading='lazy' src={products.img[0]} alt={products.nombre} />
                                            </div>
                                            {/* <div className='individual_galery'>
                                                <img loading='lazy' src={products.imgSecond} />
                                                <img loading='lazy' src={products.imgThird} />
                                                <img loading='lazy' src={products.imgFourth} />
                                            </div> */}
                                        </div>
                                        <div className='individual_content_right'>
                                            <div className='individual_info'>
                                                <h1>{products.nombre} {products.marca}</h1>
                                                <h2 style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>$<span style={{ color: "white" }}>{products.precio}</span></h2>
                                            </div>
                                            <div className='individual_items'>
                                                <h3 style={{ color: "var(--decoraciones)", textAlign: "center", marginTop: "10px" }}>
                                                    Caracteristicas
                                                    <img loading='lazy' src="https://icongr.am/clarity/clipboard.svg?size=128&color=ffffff" alt="Icono referente a lista" />
                                                </h3>
                                                <ul>
                                                    <li>Marca: {products.marca}</li>
                                                    <li>Genero: {products.genero}</li>
                                                    <li>Material: {products.material}</li>
                                                    <li>Talle: {products.talle}</li>
                                                    <li>Categoria: {products.categoria}</li>
                                                </ul>
                                            </div>
                                            <div>

                                                {
                                                    userName && (
                                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                                            <Button onClick={handleShow} className='m-3' variant='none'>
                                                                <h6 style={{ margin: "auto", padding: "5px" }}>Comprar</h6>
                                                            </Button>
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                delay={{ show: 150, hide: 400 }}
                                                                overlay={renderTooltip}
                                                            >
                                                                <img loading='lazy' className='individual_fav_icon' onClick={agregarFavorito} src="https://icongr.am/clarity/heart.svg?size=40&color=ffffff" alt="Imagen de corazon referente a agregado a favorito" />
                                                            </OverlayTrigger>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                            {alert && <Alert variant="primary">{alert}</Alert>}
                                            {alertFail && <Alert variant="danger">{alertFail}</Alert>}
                                        </div>
                                    </>
                                }
                            </>
                    }
                </div>
            </div>
            <>
                <Modal size='lg' centered="true" className='modal-container' show={show} onHide={handleClose}>
                    <Modal.Header className='modal-header' closeButton>
                        <Modal.Title>Formulario de compra</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modal-body-container'>
                        {alert && <Alert variant="danger">{alert}</Alert>}
                        <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                            <h1 style={{ borderBottom: "1px solid var(--main-bg-color)", paddingBottom: "10px", textTransform: "capitalize" }}> {products.nombre} | {products.marca} </h1>
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
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label>Direccion</Form.Label>
                                <Form.Control className="input_contact" type="name" placeholder="Provincia - Ciudad - Barrio - piso - altura" required name="direccion" maxLength="50" onChange={(e) => handleChange(e)} />
                                <Form.Control.Feedback type="invalid">
                                    Se requiere la direccion!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Recibido</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                                style={{ marginTop: "15px" }}
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label>Indicaciones adicionales</Form.Label>
                                <Form.Control className="input_contact" type="name" placeholder="Porton negro, frente a..." required name="indicaciones" maxLength="50" onChange={(e) => handleChange(e)} />
                                <Form.Control.Feedback type="invalid">
                                    Se requieren indicaciones!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Recibido</Form.Control.Feedback>
                            </Form.Group>

                            <select className="input_contact mt-3" style={{ width: "100%" }} onChange={(e) => handleCantidad(e)} name="cantidad">
                                <option defaultValue="1">Selecciona la cantidad</option>
                                {opcionesStock.map((stock, index) => (
                                    <option key={index} value={stock}>
                                        {stock}
                                    </option>
                                ))}
                            </select>

                            <Button onClick={(e) => handleChange(e)} className="contact_button" variant="none" name='codigoCompra' value={Math.floor(Math.random() * 10000)} type="submit"> {
                                cargaBoton
                                    ?
                                    <Spinner animation="border" variant="warning" />
                                    : <h6 style={{ margin: "auto", padding: "5px" }}>Confirmar datos</h6>}</Button>
                        </Form>

                        {alertSuccess && <Alert className='mt-3' variant="dark">{alertSuccess}</Alert>}
                        {userName && (
                            preferenceId && (
                                <div className='tipos-pago'>
                                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", textAlign: "center" }}>
                                        <p style={{ fontWeight: "bold" }}>Selecciona una opcion:</p>
                                        <p style={{ marginBottom: "10px" }}>Por mercado pago se recargara un 10%</p>
                                        <Wallet initialization={{ preferenceId }} />
                                        <Button className='m-3' variant='outline-warning' size="lg" onClick={() => setTransferenciaShow(true)}>Transferencia</Button>
                                    </div>
                                    <ModalTransferencia
                                        show={transferenciaShow}
                                        onHide={() => setTransferenciaShow(false)}
                                    />
                                </div>
                            )
                        )}
                    </Modal.Body>
                    <Modal.Footer className='modal-footer'>
                        <Button style={{ border: "1px solid var(--decoraciones)", color: "white" }} variant='none' onClick={handleClose}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </>
    )
}

export default ProdPrincipal