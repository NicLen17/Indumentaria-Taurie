import './CardProd.css'
import { Link } from 'react-router-dom';

function Catalogo({ filter }) {
    return (
        <div className='prods_catalogo'>
            {filter.map((prod) => {
                return (
                    <>
                        <div key={prod.id} className='card_prod_container'>
                            <Link to={`/individual/${prod._id}`} style={{ textDecoration: "none" }}>
                                <div className='card_prod_top'>
                                    <img loading='lazy' src={prod.imgFirst} alt={prod.modelo} />
                                </div>
                                <div className='card_prod_bottom'>
                                    <h5 style={{ color: "green" }}>USD<span style={{ color: "white" }}>{prod.precio}</span></h5>
                                    <h5>{prod.modelo} {prod.marca}</h5>
                                </div>
                            </Link>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default Catalogo