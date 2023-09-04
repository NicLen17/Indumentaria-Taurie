import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ProdIndividual.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Alert, Spinner } from 'react-bootstrap';
import ScrollToTop from '../Components/ScrollToTop';

function ProdPrincipal({ userName, favorito, setFavorito }) {
    const { id } = useParams();
    const [products, setproducts] = useState({});
    const [open, setOpen] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alert, setAlert] = useState("");
    const [alertFail, setAlertFail] = useState("");

    useEffect(() => {
        const producto = async () => {
            const { data } = await axios.get(`productos/${id}`);
            setproducts(data);
            setCargando(false);
        }
        producto()
    }, [id])

    const agregarFavorito = () => {
        if (!favorito.find(p => p._id === products._id)) {
            const agregado = [...favorito, products];
            setFavorito(agregado);
            setAlert(`Producto agregado a lista de favoritos!`);
        }
        else {
            setAlertFail("Este producto ya se encuentra en favoritos!");
        }
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Agregar a favoritos
        </Tooltip>
    );

    localStorage.setItem("agregarcarrito", JSON.stringify(favorito));

    return (
        <>
            <ScrollToTop />
            <div className='individual_container'>
                <div data-aos="fade-down" data-aos-delay="200" data-aos-once="true" data-aos-duration="1400" key={products.id} className='individual_content'>
                    {
                        cargando
                            ?
                            <div style={{ margin: "auto" }} className='filter_spinner_container'>
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
                                                <label
                                                    className='individual_information'
                                                    onClick={() => setOpen(!open)}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={open}>
                                                    Caracteristicas
                                                    <img loading='lazy' src="https://icongr.am/clarity/clipboard.svg?size=128&color=ffffff" alt="Icono referente a lista" />
                                                </label>
                                                <ul>
                                                    <li>Marca: {products.marca}</li>
                                                    <li>Genero: {products.genero}</li>
                                                    <li>Material: {products.material}</li>
                                                    <li>Talle: {products.talle}</li>
                                                    <li>Categoria: {products.categoria}</li>
                                                </ul>
                                            </div>
                                            <div>
                                                {/* <Link to={`/consultas/${products._id}`}>
                                                    <Button className='m-3' variant='none'> Hacer consulta </Button>
                                                </Link> */}
                                                {userName && (
                                                    <>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            delay={{ show: 150, hide: 400 }}
                                                            overlay={renderTooltip}
                                                        >
                                                            <img loading='lazy' className='individual_fav_icon' onClick={agregarFavorito} src="https://icongr.am/clarity/heart.svg?size=40&color=ffffff" alt="Imagen de corazon referente a agregado a favorito" />
                                                        </OverlayTrigger>
                                                    </>
                                                )}
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
        </>
    )
}

export default ProdPrincipal