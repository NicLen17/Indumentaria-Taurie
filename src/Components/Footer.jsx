import './Footer.css'
import Logo from '../img/Logo.webp'
// import { Link } from 'react-router-dom'


export default function Footer() {
    return (
        <div>
            <footer className="footer-distributed">
                <div className="footer-left">
                    <p className="footer-links">
                        <a href='/' className="mt-2 items-footer">Inicio</a>
                        <br />
                        <a href='/' className="mt-2 items-footer">Catalogo</a>
                        <br />
                        <a href='#contact' className="mt-2 items-footer">Contacto</a>
                        <br />
                        <a href='#about' className="mt-2 items-footer">Sobre Nosotros</a>
                        <br />
                        <a href='/' className="mt-2 items-footer">Login</a>
                    </p>
                    <div className="footer-icons">
                        <a href="mailto:indumtaurie@gmail.com?Subject=Consulta%20desde%20la%20pagina%20web.%20"><img loading='lazy' className='Redes-footer' src="https://icongr.am/simple/gmail.svg?size=128&color=currentColor&colored=true " alt="" /></a>
                        <a target="blank"  href="https://www.instagram.com/indumentaria_taurie/"><img loading='lazy' className='Redes-footer' src="https://icongr.am/fontawesome/instagram.svg?size=128&color=ff24f8" alt="" /></a>
                        <a target="blank"  href="https://wa.me/543813379225?text=Buenos%20días,%20vengo%20desde%20la%20pagina%20web%20para%20realizar%20una%20consulta.%20"><img loading='lazy' className='Redes-footer' src="https://icongr.am/fontawesome/whatsapp.svg?size=30&color=1dcd3b" alt="" /></a> 
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
