import ScrollToTop from '../Components/ScrollToTop';
import './Profile.css'

export default function Profile({ user }) {
    return (
        <>
            <ScrollToTop />
            <div data-aos="fade-down" data-aos-once="true" data-aos-duration="800" className="perfil_container">
                <div className='perfil_content'>
                    <div className="Perfil-img-cont">
                        <img loading='lazy' className="perfil_img" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" />
                    </div>
                    <div className='perfil_info'>
                        <p style={{ color: "white" }}><b style={{ color: "var(--decoraciones)" }}>Nombre:</b> {user.nombre}</p>
                        <p style={{ color: "white" }}><b style={{ color: "var(--decoraciones)" }}>Mail:</b> {user.email}</p>
                        <p style={{ color: "white" }}><b style={{ color: "var(--decoraciones)" }}>Celular:</b> {user.celular}</p>
                    </div>
                </div>
            </div>
        </>

    );
}
