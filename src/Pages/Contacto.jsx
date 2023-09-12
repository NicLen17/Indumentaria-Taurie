import About from "../Components/About"
import Contact from "../Components/Contact"
import FormContact from "../Components/FormContact"
import Jump from "../Components/Jump"
import ScrolltoTop from '../Components/ScrollToTop'

function Contacto() {
    return (
        <>
        <ScrolltoTop />
        <About />
        <Jump />
        <Contact />
        <Jump />
        <FormContact />
        <Jump />
        </>
    )
}

export default Contacto