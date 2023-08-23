import Footer from './Components/Footer'
import NavB from './Components/NavB'
import Carousel from './Components/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './Components/About';
import Jump from './Components/Jump';
import Contact from './Components/Contact';
import PopularProd from './Components/PopularProd';

function App() {

  return (
    <>
      <div>
        <NavB />
        <Carousel />
        <Jump />
        <PopularProd />
        <Jump />
        <About />
        <Jump />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App
