import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Components/Footer'
import NavB from '../Components/NavB'
import Carousel from '../Components/Carousel'
import About from '../Components/About';
import Jump from '../Components/Jump';
import Contact from '../Components/Contact';
import PopularProd from '../Components/PopularProd';

function Inicio() {
    return (
        <div>
            <NavB />
            <Carousel />
            <Jump />
            <PopularProd />
            <Jump />
            <About />
            <Jump />
            <Contact />
            <Jump />
            <Footer />
        </div>
    )
}

export default Inicio