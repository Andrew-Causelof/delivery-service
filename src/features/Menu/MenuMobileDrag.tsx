import { useMemo, useEffect, useRef } from 'react';
import { useUIStore } from '../../stores/uiStore';
import { useProductStore } from '../../stores/productStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';

const MIN_HEIGHT = 360;
const MAX_HEIGHT = Math.min(window.innerHeight * 0.9, 720);
const START_HEIGHT = Math.max(300, Math.min(MAX_HEIGHT - 40, 460));

function MenuMobileDrag() {
  const { dragMenu, setDragMenu, activeTab, setActiveTab } = useUIStore();
  const sections = useProductStore((state) => state.sections);
  const selectedFilters = useProductStore((state) => state.selectedFilters);

  const filteredSections = useMemo(() => {
    return selectedFilters.length === 0
      ? sections
      : sections
          .map((section) => ({
            ...section,
            items: section.items.filter((item) =>
              Object.keys(item.filterList).some((tag) => selectedFilters.includes(tag))
            ),
          }))
          .filter((section) => section.items.length > 0);
  }, [sections, selectedFilters]);

  // const filteredSections =
  //   selectedFilters.length === 0
  //     ? sections
  //     : sections
  //         .map((section) => ({
  //           ...section,
  //           items: section.items.filter((item) =>
  //             Object.keys(item.filterList).some((tag) => selectedFilters.includes(tag))
  //           ),
  //         }))
  //         .filter((section) => section.items.length > 0);

  const menuRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionElements = document.querySelectorAll('[data-section]');

    const options = {
      root: null,
      rootMargin: '0px 0px -70% 0px', // позволяет считать секцию активной, когда она вошла на 30% сверху
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slug = entry.target.getAttribute('data-section');
          if (slug) setActiveTab(slug);
        }
      });
    }, options);

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el));
    };
  }, [filteredSections]);

  useEffect(() => {
    if (filteredSections.length && activeTab === '') {
      setActiveTab(filteredSections[0].slug);
    }
  }, [filteredSections]);

  // --- DRAG ---
  useEffect(() => {
    const menu = menuRef.current;
    const bar = barRef.current;
    if (!menu || !bar) return;

    let startY = 0;
    let startH = START_HEIGHT;
    let dragging = false;

    const setHeight = (h: number) => {
      const clamped = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, h));
      menu.style.height = `${clamped}px`;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!dragMenu) return; // тянем только когда меню открыто
      dragging = true;
      startY = e.clientY;
      startH = menu.getBoundingClientRect().height || START_HEIGHT;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      // блокируем прокрутку страницы во время перетаскивания
      document.body.style.overflow = 'hidden';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const diff = startY - e.clientY; // вверх = увеличиваем высоту
      setHeight(startH + diff);
    };

    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      document.body.style.overflow = '';
      const currentH = menu.getBoundingClientRect().height;
      if (currentH <= MIN_HEIGHT) {
        // закрываем
        menu.style.height = '';
        setDragMenu(false);
      }
    };

    bar.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);

    // при открытии задаём стартовую высоту
    if (dragMenu) setHeight(START_HEIGHT);
    else menu.style.height = '';

    return () => {
      bar.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      document.body.style.overflow = '';
    };
  }, [dragMenu, setDragMenu]);

  useEffect(() => {
    if (dragMenu) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [dragMenu]);

  const handleOnClick = (tab: string) => {
    setActiveTab(tab);
    const section = document.querySelector(`[data-section="${tab}"]`);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={menuRef} className={`delivery-footer-menu${dragMenu ? ' active' : ''}`}>
      <div ref={barRef} className="delivery-drag-bar">
        <span className="drag-bar" />
      </div>

      {/* ВЕРТИКАЛЬНЫЙ SWIPER */}
      <Swiper
        modules={[FreeMode, Mousewheel]}
        direction="vertical"
        slidesPerView="auto" // похожее поведение на твой старый список
        freeMode={true}
        mousewheel={{ releaseOnEdges: true }}
        loop={false}
        allowTouchMove={true}
        className="menu-delivery-slider menu-delivery-scroll"
        observeParents
        observer
        resizeObserver
        slidesOffsetAfter={12} // небольшой нижний отступ
        style={{ height: 'calc(100% - 68px)' }} // 28px = высота drag-bar
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
    </div>
  );
}

export default MenuMobileDrag;
