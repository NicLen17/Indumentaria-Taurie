import './Contact.css'
import WA2 from '../img/WA2.webp'
import IG2 from '../img/IG2.webp'
import GMAIL1 from '../img/GMAIL1.webp'

function Contact() {
    return (
        <>
            <h1 style={{color: "white", textAlign: "center", margin: "-50px 0px 60px 0px", textShadow: "white 1px 0 15px", fontSize: "3rem"}}>Contactanos</h1>
                <div id='contact' className='Contact-container'>
            <div className='Contact-element m-3'>
                <div className='Contact-img'>
                    <a rel='noreferrer' target='_blank' href="https://wa.me/543813379225?text=Buenos%20días,%20vengo%20desde%20la%20pagina%20web%20para%20realizar%20una%20consulta.%20"><img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }} src={WA2} alt="" /></a>
                </div>
            </div>
            <div className='Contact-element m-3'>
                <div className='Contact-img'>
                    <a rel='noreferrer' target='_blank' href="mailto:indumtaurie@gmail.com?Subject=Consulta%20desde%20la%20pagina%20web.%20"><img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }} src={GMAIL1} alt="" /></a>
                </div>
            </div>
            <div className='Contact-element m-3'>
                <div className='Contact-img'>
                    <a rel='noreferrer' target='_blank' href="https://www.instagram.com/indumentaria_taurie/"><img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }} src={IG2} alt="" /></a>
                </div>
            </div>
        </div>
        </>
    )
}

export default Contact