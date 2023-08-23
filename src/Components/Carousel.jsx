import 'swiper/css';
import './Carousel.css'
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function Carousel() {
    return (
        <div className="Carousel-container">
            <Swiper
                pagination={{
                    type: 'progressbar',
                }}
                spaceBetween={30}
                loop={true}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="Carousel"
            >
                <SwiperSlide><img src="https://st2.depositphotos.com/1001094/11030/i/450/depositphotos_110301622-Young-sensual--beauty-woman-in-casual-clothes-pose-on-grunge-wooden-background.-Black-white-fashion-photo..jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://c0.wallpaperflare.com/preview/807/935/664/apparel-black-and-white-boutique-close-up.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://media.istockphoto.com/id/666280498/photo/black-and-white-background-of-many-clothes-hang-in-wardrobe.jpg?s=612x612&w=0&k=20&c=QXXzTkdm8GCmFFEtvwhUJdJnZIPzsVuCzEoVs6RGBCI=" alt="" /></SwiperSlide>
            </Swiper>
            <div className="Card-Row-Container">
                <ul className="Card-Row">
                    <li className='Row-item'><img src="https://naranjax.hiringroom.com/data/accounts/naranjax/microsite/fac6cee5f4d8d06bfcf5c83293e29eee.jpg" alt="" /></li>
                    <li className='Row-item'><img src="https://play-lh.googleusercontent.com/4hN-UTy-2_Ma1Ouye5FpN2Issj73Oms62hokLp5OZR6zdt2yzkEpGSpK0v47RK8Oc8Q" alt="" /></li>
                    <li className='Row-item'><img src="https://cdn-icons-png.flaticon.com/512/489/489114.png" alt="" /></li>
                    <li className='Row-item'><img src="https://img.freepik.com/vector-gratis/ilustracion-vectorial-estilo-retro-mano-dando-dinero-otra-mano_1284-42589.jpg" alt="" /></li>
                    <li className='Row-item'><img src="https://cdn-icons-png.flaticon.com/512/4614/4614153.png" alt="" /></li>
                    <li className='Row-item'><img src="https://img.freepik.com/vector-premium/vector-icono-camion-entrega-simbolo-servicio-envio-rapido_101884-297.jpg" alt="" /></li>
                </ul>
            </div>
        </div>
    )
}

export default Carousel