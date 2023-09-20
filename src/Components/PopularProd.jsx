import './PopularProd.css'
import { Card } from 'react-bootstrap';
import Remera from '../img/Remera.webp';
import HoodieV from '../img/HoodieV.png';
import CanguroN from '../img/CanguroN.png';
import Accesorios from '../img/Accesorios.webp';
import { Link, NavLink } from 'react-router-dom';


function PopularProd() {
  return (
    <>
      <h1 style={{ color: "white", textAlign: "center", margin: "-50px 0px 60px 0px", textShadow: "white 1px 0 15px", fontSize: "3rem" }}>Categorias Populares</h1>
      <div className="Popular-container">
        <Link data-aos="fade-down" data-aos-delay="200" data-aos-once="true" data-aos-duration="800"  as={NavLink} style={{ textDecoration: "none" }} to={"/productos/hoodies"}>
          <Card className='Popular-card' style={{ width: '22rem' }}>
            <Card.Img variant="top" className='Popular-card-img' src={CanguroN} />
            <Card.Body>
              <Card.Title className='Popular-card-title'>Hoodies</Card.Title>
            </Card.Body>
          </Card>
        </Link>

        <Link data-aos="fade-down" data-aos-delay="300" data-aos-once="true" data-aos-duration="800" as={NavLink} style={{ textDecoration: "none" }} to={"/productos/remeras"}>
          <Card className='Popular-card' style={{ width: '22rem' }}>
            <Card.Img variant="top" className='Popular-card-img' src={Remera} />
            <Card.Body>
              <Card.Title className='Popular-card-title'>Remeras</Card.Title>
            </Card.Body>
          </Card>
        </Link>

        <Link data-aos="fade-down" data-aos-delay="400" data-aos-once="true" data-aos-duration="800" as={NavLink} style={{ textDecoration: "none" }} to={"/productos/canguros"}>
          <Card className='Popular-card' style={{ width: '22rem' }}>
            <Card.Img variant="top" className='Popular-card-img' src={HoodieV} />
            <Card.Body>
              <Card.Title className='Popular-card-title'>Canguros</Card.Title>
            </Card.Body>
          </Card>
        </Link>

        <Link data-aos="fade-down" data-aos-delay="500" data-aos-once="true" data-aos-duration="800" as={NavLink} style={{ textDecoration: "none" }} to={"/productos"}>
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
