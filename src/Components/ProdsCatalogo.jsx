import './ProdsCatalogo.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import SearchaBar from './SearchaBar';

function ProdsCatalogo() {

    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const productos = async () => {
            const { data } = await axios.get("productos");
            setProducts(data);
            setFilter(data);
            setCargando(false);
        };
        productos()
    }, []);

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    }

    const onSearch = (searchTerm, e) => {
        e.preventDefault();
        const buscado = searchTerm.toString().toLowerCase();
        const filter = products.filter((producto) => {
            const nombreBuscado = producto.nombre.toLowerCase();
            const generoBuscado = producto.genero.toLowerCase();
            const talleBuscado = producto.talle.toLowerCase();
            const materialBuscado = producto.material.toLowerCase();
            const categoriaBuscada = producto.categoria.toLowerCase();
            const marcaBuscada = producto.marca.toLowerCase();
            return nombreBuscado.includes(buscado) || generoBuscado.includes(buscado) || talleBuscado.includes(buscado) || materialBuscado.includes(buscado) || categoriaBuscada.includes(buscado) || marcaBuscada.includes(buscado);
        });
        if (filter.length === 0) {
            setFilter(products)
        } else {
            setFilter(filter);
        }
    }

    const limpiar = () => {
        setFilter(products);
        setBusqueda('');
    }

    return (
        <>
            <SearchaBar limpiar={limpiar} onSearch={onSearch} handleBusqueda={handleBusqueda} busqueda={busqueda}/>
            {
                busqueda &&(
                    <h2 className='Search-title'>Buscando productos: <span style={{color: "var(--decoraciones)"}}>{busqueda}</span></h2>
                )
            }
            {
                cargando
                    ?
                    <div style={{ margin: "auto" }} className='filter_spinner_container'>
                        <Spinner className='filter_spinner m-auto' variant="warning" />
                        <p className='filter_spinner_text'>La carga puede llevar un momento...</p>
                    </div>
                    :
                    <>
                        {
                            <>
                                <div className='Catalogo-container'>
                                    {filter.map((prod) => {
                                        return (
                                            <>
                                                <div data-aos="fade-up" data-aos-delay="200" data-aos-once="true" data-aos-duration="1000" key={prod.id} className='Catalogo-cards'>
                                                    <Link to={`/individual/${prod._id}`} style={{ textDecoration: "none" }}>
                                                        <div className='Card-catalogo'>
                                                            <div className='Catalogo-img'>
                                                                <img src={prod.imgFirst} alt="" />
                                                            </div>
                                                            <h3 style={{textTransform: "capitalize"}}> {prod.nombre} </h3>
                                                            <p> <span style={{ color: "green" }}>$</span>{prod.precio} </p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </>
                        }
                    </>
            }
        </>
    )
}

export default ProdsCatalogo