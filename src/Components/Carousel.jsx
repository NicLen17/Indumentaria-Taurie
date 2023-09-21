import 'swiper/css';
import './Carousel.css'
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function Carousel() {
    return (
        <div data-aos-duration="1000" data-aos="fade-up" data-aos-once="true" data-aos-delay="100" className="Carousel-container">
            <Swiper
                pagination={{
                    type: 'progressbar',
                }}
                autoplay
                spaceBetween={30}
                loop={true}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="Carousel"
            >
                <SwiperSlide><img src="https://st2.depositphotos.com/1001094/11030/i/450/depositphotos_110301622-Young-sensual--beauty-woman-in-casual-clothes-pose-on-grunge-wooden-background.-Black-white-fashion-photo..jpg" alt="Imagen Carrusel - Taurie" /></SwiperSlide>
                <SwiperSlide><img src="https://c0.wallpaperflare.com/preview/807/935/664/apparel-black-and-white-boutique-close-up.jpg" alt="Imagen Carrusel - Taurie" /></SwiperSlide>
                <SwiperSlide><img src="https://media.istockphoto.com/id/666280498/photo/black-and-white-background-of-many-clothes-hang-in-wardrobe.jpg?s=612x612&w=0&k=20&c=QXXzTkdm8GCmFFEtvwhUJdJnZIPzsVuCzEoVs6RGBCI=" alt="Imagen Carrusel - Taurie" /></SwiperSlide>
            </Swiper>
            <div className="Card-Row-Container">
                <div data-aos="fade-down" data-aos-once="true" className="Card-Row">
                    <h1>Taurie</h1>
                </div>
            </div>
        </div>
    )
}

export default Carousel