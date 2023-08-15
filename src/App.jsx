import Footer from './Components/Footer'
import NavB from './Components/NavB'
import Carousel from './Components/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './Components/About';
import Jump from './Components/Jump';

function App() {

  return (
    <>
      <div>
        <NavB />
        <Carousel />
        <Jump />
        <About />
        <Jump />
        <Footer />
      </div>
    </>
  )
}

export default App
