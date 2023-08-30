import './PopularProd.css'
import { Card } from 'react-bootstrap';
import Remera from '../img/Remera.webp';
import BuzoN from '../img/BuzoN.webp';
import Canguro from '../img/Canguro.webp';
import Accesorios from '../img/Accesorios.webp';
import { Link, NavLink } from 'react-router-dom';


function PopularProd() {
  return (
    <>
      <h1 style={{ color: "white", textAlign: "center", margin: "-50px 0px 60px 0px", textShadow: "white 1px 0 15px", fontSize: "3rem" }}>Categorias Populares</h1>
      <div className="Popular-container">
        <Link as={NavLink} style={{textDecoration: "none"}} to={"/productos"}>
          <Card className='Popular-card' style={{ width: '22rem' }}>
            <Card.Img variant="top" className='Popular-card-img' src={BuzoN} />
            <Card.Body>
              <Card.Title className='Popular-card-title'>Hoodies</Card.Title>
            </Card.Body>
          </Card>
        </Link>

        <Link as={NavLink} style={{textDecoration: "none"}} to={"/productos"}>
          <Card className='Popular-card' style={{ width: '22rem' }}>
            <Card.Img variant="top" className='Popular-card-img' src={Remera} />
            <Card.Body>
              <Card.Title className='Popular-card-title'>Remeras</Card.Title>
            </Card.Body>
          </Card>
        </Link>

        <Link as={NavLink} style={{textDecoration: "none"}} to={"/productos"}>
          <Card className='Popular-card' style={{ width: '22rem' }}>
            <Card.Img variant="top" className='Popular-card-img' src={Canguro} />
            <Card.Body>
              <Card.Title className='Popular-card-title'>Canguros</Card.Title>
            </Card.Body>
          </Card>
        </Link>

        <Link as={NavLink} style={{textDecoration: "none"}} to={"/productos"}>
          <Card className='Popular-card' style={{ width: '22rem' }}>
            <Card.Img variant="top" className='Popular-card-img' src={Accesorios} />
            <Card.Body>
              <Card.Title className='Popular-card-title'>Accesorios</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </>
  );
}

export default PopularProd;
