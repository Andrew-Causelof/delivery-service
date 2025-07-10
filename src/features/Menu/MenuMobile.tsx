import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { useProductStore } from '../../stores/productStore';

function MenuMobile() {
  const { sections, loading } = useProductStore();

  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    if (sections.length) {
      setActiveTab(sections[0].slug);
    }
  }, [sections]);

  const handleOnClick = (tab: string) => {
    setActiveTab(tab);
    const section = document.getElementById(tab);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-menu-mobile">
      <div className="burger-delivery-wrapper">
        <div className="burger-delivery">
          <div className="pipe1 pipe"></div>
          <div className="pipe2 pipe"></div>
          <div className="pipe3 pipe"></div>
        </div>
      </div>

      <Swiper
        modules={[FreeMode]}
        spaceBetween={6}
        slidesPerView="auto"
        freeMode={true}
        loop={true}
        className="menu flex-column flex-start"
      >
        {sections.map((item) => (
          <SwiperSlide
            key={item.slug}
            className={`menu-item${activeTab === item.slug ? ' active' : ''}`}
            onClick={() => handleOnClick(item.slug)}
          >
            <div className="pic">
              <img src={item.img} alt={item.title} />
            </div>
            <a href={item.slug || '#'} className="link">
              {item.title}
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default MenuMobile;
