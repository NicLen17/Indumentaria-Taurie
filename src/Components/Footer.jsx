import './Footer.css'
import Logo from '../img/Logo.webp'
// import { Link } from 'react-router-dom'


export default function Footer() {
    return (
        <div>
            <footer className="footer-distributed">
                <div className="footer-left">
                    <p className="footer-links">
                        <a to={"/"} className="mt-2 items-footer">Inicio</a>
                        <br />
                        <a to={"/productos"} className="mt-2 items-footer">Catalogo</a>
                        <br />
                        <a to={"/about"} className="mt-2 items-footer">Contacto</a>
                        <br />
                        <a to={"/login"} className="mt-2 items-footer">Login</a>
                    </p>
                    <div className="footer-icons">
                        <a href="mailto:cawvehiculos@gmail.com?subject='Hola!'&body='Me comunico desde la pagina web'"><img loading='lazy' className='Redes-footer' src="https://icongr.am/simple/gmail.svg?size=128&color=currentColor&colored=true " alt="" /></a>
                        <a target="blank"  href="https://www.instagram.com/cawvehiculos/"><img loading='lazy' className='Redes-footer' src="https://icongr.am/fontawesome/instagram.svg?size=128&color=ff24f8" alt="" /></a>
                        <a target="blank"  href="https://api.whatsapp.com/send?phone=5493815709862"><img loading='lazy' className='Redes-footer' src="https://icongr.am/fontawesome/whatsapp.svg?size=30&color=1dcd3b" alt="" /></a> 
                    </div>
                </div>
                <div className="footer-right">
                    <div className="mapa-footer mt-2">
                        <img loading='lazy' src={Logo} alt="Indumentaria Taurie - Ropa - Remera" />
                    </div>
                </div>
            </footer>
        </div>
    )
}
