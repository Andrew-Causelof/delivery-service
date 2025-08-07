import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { useProductStore } from '../../stores/productStore';

function DishTypeFilter() {
  const { dishFilter, loading } = useProductStore();

  const selectedFilters = useProductStore((state) => state.selectedFilters);
  const toggleFilter = useProductStore((state) => state.toggleFilter);

  return (
    <section className="dish-type-filter">
      <Swiper
        modules={[FreeMode]}
        slidesPerView="auto"
        freeMode
        spaceBetween={6}
        className="dish-type-slider"
      >
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <SwiperSlide key={i} tag="li" className="swiper-slide skeleton-slide">
                <div className="skeleton-icon shimmer"></div>
                <div className="skeleton-text shimmer"></div>
              </SwiperSlide>
            ))
          : dishFilter.map(({ slug, name, icon }) => (
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
