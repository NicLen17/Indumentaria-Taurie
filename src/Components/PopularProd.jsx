import './PopularProd.css'
import BuzoM from '../img/BuzoM.webp';
import BuzoN from '../img/BuzoN.webp';
import BuzoC from '../img/BuzoC.png';
import BuzoR from '../img/BuzoR.png';
import { Card } from 'react-bootstrap';

function PopularProd() {
  return (
    <>
    <h1 style={{color: "white", textAlign: "center", margin: "-50px 0px 60px 0px", textShadow: "white 1px 0 15px", fontSize: "3rem"}}>Ultimos agregados</h1>
    <div className="Popular-container">
      <Card className='Popular-card' style={{ width: '22rem' }}>
      <Card.Img variant="top" className='Popular-card-img' src={BuzoR} />
      <Card.Body>
        <Card.Title className='Popular-card-title'>Buzo Marron</Card.Title>
      </Card.Body>
    </Card>
    <Card className='Popular-card' style={{ width: '22rem' }}>
      <Card.Img variant="top" className='Popular-card-img' src={BuzoC} />
      <Card.Body>
        <Card.Title className='Popular-card-title'>Buzo Marron</Card.Title>
      </Card.Body>
    </Card>
    <Card className='Popular-card' style={{ width: '22rem' }}>
      <Card.Img variant="top" className='Popular-card-img' src={BuzoN} />
      <Card.Body>
        <Card.Title className='Popular-card-title'>Buzo Marron</Card.Title>
      </Card.Body>
    </Card>
    <Card className='Popular-card' style={{ width: '22rem' }}>
      <Card.Img variant="top" className='Popular-card-img' src={BuzoM} />
      <Card.Body>
        <Card.Title className='Popular-card-title'>Buzo Marron</Card.Title>
      </Card.Body>
    </Card>
    </div>
    </>
  );
}

export default PopularProd;
