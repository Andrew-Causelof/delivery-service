import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

function Banner() {
  type Slide = {
    url: string;
    alt: string;
  };

  const slides: Slide[] = [
    {
      url: '/assets/img/banner-slide-2.webp',
      alt: 'галерея 2',
    },
    {
      url: '/assets/img/banner-slide-4.webp',
      alt: 'галерея 3',
    },
  ];

  return (
    <section className="delivery-banner-slider">
      <Swiper
        modules={[Navigation, Autoplay]}
        direction="horizontal"
        slidesPerView={1}
        centeredSlides={true}
        speed={1000}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={{
          nextEl: '.arrow--right',
          prevEl: '.arrow--left',
        }}
        className="swiper-wrapper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide.url} alt={slide.alt} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="navigation">
        <div className="left-white arrow--left arrow"></div>
        <div className="right-white arrow--right arrow"></div>
      </div>
    </section>
  );
}

export default Banner;
