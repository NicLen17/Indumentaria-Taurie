import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from '../Components/Carousel'
import Jump from '../Components/Jump';
import PopularProd from '../Components/PopularProd';

function Inicio() {
    return (
        <div>
            <Carousel />
            <Jump />
            <PopularProd />
            <Jump />
        </div>
    )
}

export default Inicio