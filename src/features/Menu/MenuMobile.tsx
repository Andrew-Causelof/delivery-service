import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { useProductStore } from '../../stores/productStore';

function MenuMobile() {
  // const { sections, loading } = useProductStore();
  const sections = useProductStore((state) => state.sections);
  const selectedFilters = useProductStore((state) => state.selectedFilters);

  const filteredSections =
    selectedFilters.length === 0
      ? sections
      : sections
          .map((section) => ({
            ...section,
            items: section.items.filter((item) =>
              Object.keys(item.filterList).some((tag) => selectedFilters.includes(tag))
            ),
          }))
          .filter((section) => section.items.length > 0);

  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    if (filteredSections.length && activeTab === '') {
      setActiveTab(filteredSections[0].slug);
    }
  }, [filteredSections]);

  const handleOnClick = (tab: string) => {
    setActiveTab(tab);
    const section = document.querySelector(`[data-section="${tab}"]`);
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
        {filteredSections.map((item) => (
          <SwiperSlide
            key={item.slug}
            className={`menu-item${activeTab === item.slug ? ' active' : ''}`}
            onClick={() => handleOnClick(item.slug)}
          >
            <div className="pic">
              <img src={item.img} alt={item.title} />
            </div>
            <a className="link">{item.title}</a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default MenuMobile;
