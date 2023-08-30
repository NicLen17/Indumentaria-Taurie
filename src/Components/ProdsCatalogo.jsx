import './ProdsCatalogo.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProdsCatalogo() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productos = async () => {
            const { data } = await axios.get("productos");
            setProducts(data);
        };
        productos()
    }, []);

    return (
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
                                <p> {prod.precio} </p>
                            </div>
                            </Link>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default ProdsCatalogo