import './ProdsCatalogo.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

function ProdsCatalogo() {

    const [products, setProducts] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const productos = async () => {
            const { data } = await axios.get("productos");
            setProducts(data);
            setCargando(false);
        };
        productos()
    }, []);

    return (
        <>
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
                                    {products.map((prod) => {
                                        return (
                                            <>
                                                <div key={prod.id} className='Catalogo-cards'>
                                                    <Link to={`/individual/${prod._id}`} style={{ textDecoration: "none" }}>
                                                        <div className='Card-catalogo'>
                                                            <div className='Catalogo-img'>
                                                                <img src={prod.imgFirst} alt="" />
                                                            </div>
                                                            <h3> {prod.nombre} </h3>
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