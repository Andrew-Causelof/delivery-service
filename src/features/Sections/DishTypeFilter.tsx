import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { useProductStore } from '../../stores/productStore';

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
  { slug: 'hot', name: 'Острое', icon: 'hot' },
  { slug: 'halal', name: 'Халяль', icon: 'halal' },
  { slug: 'bezglutena', name: 'Без глютена', icon: 'bezglutena' },
  { slug: 'nuts', name: 'Орехи', icon: 'nuts' },
];

function DishTypeFilter() {
  // const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // const toggleFilter = (slug: string) => {
  //   setActiveFilters((prev) =>
  //     prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
  //   );
  // };

  const selectedFilters = useProductStore((state) => state.selectedFilters);
  const toggleFilter = useProductStore((state) => state.toggleFilter);

  console.log(selectedFilters);

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
            className={`swiper-slide ${selectedFilters.includes(slug) ? 'active' : ''}`}
            onClick={() => toggleFilter(slug)}
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
