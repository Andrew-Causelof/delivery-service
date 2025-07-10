import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

type DishType = {
  slug: string;
  name: string;
  icon: string;
};

const dishTypes: DishType[] = [
  { slug: 'chicken', name: 'Птица', icon: 'chicken' },
  { slug: 'beef', name: 'Говядина/Телятина', icon: 'beef' },
  { slug: 'lamb', name: 'Баранина', icon: 'lamb' },
  { slug: 'pork', name: 'Свинина', icon: 'pork' },
  { slug: 'fish', name: 'Рыба', icon: 'fish' },
  { slug: 'vegan', name: 'Веган', icon: 'vegan' },
];

function DishTypeFilter() {
  const [active, setActive] = useState<string>('chicken');

  return (
    <section className="dish-type-filter">
      <Swiper
        modules={[FreeMode]}
        slidesPerView="auto"
        freeMode
        spaceBetween={6}
        className="dish-type-slider"
      >
        {dishTypes.map(({ slug, name, icon }) => (
          <SwiperSlide
            key={slug}
            tag="li"
            className={`swiper-slide ${active === slug ? 'active' : ''}`}
            onClick={() => setActive(slug)}
          >
            <i className={icon}></i>
            <span>{name}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default DishTypeFilter;
