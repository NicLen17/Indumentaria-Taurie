import ScrollToTop from '../Components/ScrollToTop';
import './Profile.css'

export default function Profile({ user }) {
    return (
        <>
            <ScrollToTop />
            <div data-aos="fade-down" data-aos-once="true" data-aos-duration="800" className="perfil_container">
                <div className='perfil_content'>
                    <div className="Perfil-img-cont">
                        <h1 className="Perfil_img"> {user.nombre} </h1>
                    </div>
                    <div className='perfil_info'>
                        <p style={{ color: "white" }}><b style={{ color: "var(--decoraciones)" }}>Mail:</b> {user.email}</p>
                        <p style={{ color: "white" }}><b style={{ color: "var(--decoraciones)" }}>Celular:</b> {user.celular}</p>
                        <p style={{ color: "white" }}><b style={{ color: "var(--decoraciones)" }}>Codigo de usuario:</b> {user._id}</p>
                    </div>
                </div>
            </div>
        </>

    );
}
