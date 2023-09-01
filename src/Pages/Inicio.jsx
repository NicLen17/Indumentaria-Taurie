import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from '../Components/Carousel'
import Jump from '../Components/Jump';
import PopularProd from '../Components/PopularProd';
import ScrolltoTop from '../Components/ScrollToTop'

function Inicio() {
    return (
        <div>
            <ScrolltoTop /> 
            <Carousel />
            <Jump />
            <PopularProd />
            <Jump />
        </div>
    )
}

export default Inicio