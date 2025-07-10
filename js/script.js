// Временное решение - не подлежит переносу!!!
let include = {
  sprite: {
    render: async () => {
      content = await fetch('/include/sprite.html', { method: 'GET' });
      content.text().then(function (text) {
        document.querySelector('#sprites').innerHTML = text;
      });
    },
  },
  footer: {
    render: async () => {
      content = await fetch('/include/footer.html', { method: 'GET' });
      content.text().then(function (text) {
        document.querySelector('footer').innerHTML = text;
      });
    },
  },
};
// Временное решение - не подлежит переносу!!!

function afterLoaded(callback) {
  document.addEventListener('DOMContentLoaded', callback);
}

let menu = {
  init: function () {
    menu.headerRestaurant();
    menu.mobileMenu();
    menu.deliveryMenu();
    menu.initDragMenu();
  },
  headerRestaurant: function () {
    const els = document.querySelectorAll('a[data-restaurant]');
    els?.forEach((el) => {
      el.addEventListener('mouseover', (e) => {
        const slug = el.dataset.restaurant;
        document.querySelector(`a[data-restaurant].active`)?.classList.remove('active');
        document.querySelector(`.group[data-restaurant].active`)?.classList.remove('active');
        document.querySelector(`.group[data-restaurant="${slug}"]`)?.classList.add('active');
        el.classList.add('active');
      });
    });
  },

  mobileMenu: function () {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.header-mobile .header-nav-menu');
    burger?.addEventListener('click', function () {
      this.classList.toggle('cross');
      menu.classList.toggle('active');
    });

    // выпадающий список
    const lists = document.querySelectorAll('.header-mobile li.nav-daw');
    lists?.forEach((item) => {
      item.addEventListener('click', (e) => {
        const menu = item.querySelector('.dropdown-container');
        item.classList.toggle('active');
        if (menu != null) {
          item.classList.contains('active')
            ? animation.slideDown(menu, 0.3, 'flex')
            : animation.slideUp(menu, 0.3);
        }
      });
    });
    //переход по ссылке при клике на блок

    const links = document.querySelectorAll('.header-mobile li.single');
    links?.forEach((item) => {
      item.addEventListener('click', (e) => {
        item.querySelector('a')?.click();
      });
    });
  },

  deliveryMenu: function () {
    if (window.innerWidth > 480) {
      return;
    }
    const deliveryBurger = document.querySelector('.burger-delivery');
    const deliveryFooterMenu = document.querySelector('.delivery-footer-menu');
    if (deliveryBurger) {
      deliveryBurger.addEventListener('click', (e) => {
        deliveryBurger.classList.toggle('cross');
        deliveryFooterMenu.classList.toggle('active');
      });
    }
  },

  initDragMenu: function () {
    const dragBar = document.querySelector('.delivery-drag-bar');
    const menu = document.querySelector('.delivery-footer-menu');

    if (!menu) {
      return;
    }

    let isDragging = false;
    let startY;

    dragBar.addEventListener('touchstart', function (e) {
      isDragging = true;
      startY = e.touches[0].clientY;
    });
    document.addEventListener('touchend', function () {
      isDragging = false;
    });

    document.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      let diff = startY - e.touches[0].clientY;
      let newHeight = menu.offsetHeight + diff / 2;
      if (newHeight <= 400) {
        menu.classList.remove('active');
        document.querySelector('.burger-delivery').classList.remove('cross');
        isDragging = false;
        return;
      }

      menu.style.height = `${newHeight}px`;
      startY = e.touches[0].clientY;
    });
    document.addEventListener(
      'touchmove',
      function (e) {
        if (menu.contains(e.target) && isDragging) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      { passive: false }
    );
  },
};

tags = {
  initTags: function (selector, params = {}) {
    const mobile = window.innerWidth <= 480;
    const container = document.querySelector(selector);
    const tagsRow = container?.querySelectorAll('.tags');
    const containerHeight = tagsRow && tagsRow[0]?.querySelector('.tag')?.offsetHeight;
    const containerWidth = tagsRow && tagsRow[0]?.offsetWidth;
    const showIcon = mobile ? params.iconMobile : params.iconDesktop;

    tagsRow?.forEach((tagsContainer) => {
      const tags = tagsContainer?.querySelectorAll('.tag');

      let hiddenTags = [];

      if (tagsContainer.offsetHeight > containerHeight) {
        const lastTag = tags[tags.length - 1];

        if (lastTag && showIcon) {
          const moreTag = lastTag.cloneNode(true);
          moreTag.classList.add('more-tags', 'has-icon');
          const i = moreTag.querySelector('i');
          moreTag.innerHTML = i.innerHTML + '...';

          tagsContainer.appendChild(moreTag);
        } else {
          const moreTag = document.createElement('a');
          moreTag.className = 'tag more-tags';
          moreTag.textContent = '...';
          tagsContainer.appendChild(moreTag);
        }
      }

      tags.forEach((tag, index) => {
        if (index === 0) {
          return; // пропустить первый тег
        }

        if (
          tagsContainer.offsetHeight > containerHeight ||
          tagsContainer.offsetWidth > containerWidth
        ) {
          tag.classList.add('hide');
          hiddenTags.push(tag);
        }
      });

      if (hiddenTags.length > 0) {
        const moreTarg = tagsContainer.querySelector('.more-tags');
        moreTarg?.addEventListener('click', function (e) {
          hiddenTags.forEach((tag) => {
            tag.style.display = 'inline-flex';
          });
          moreTarg.style.display = 'none';
        });
      }
    });
  },
};

let slider = {
  mainBanner: {
    class: '.banner-slider',
    config: {
      direction: 'horizontal',
      slidesPerView: 1,
      spaceBetween: 3000,
      centeredSlides: true,
      // autoplay: {
      //     delay: 2500,
      //     disableOnInteraction: false,
      //   },
      loop: true,
      freeMode: false,
      pagination: {
        el: '.swiper-pagination',
      },
      effect: 'coverflow',
    },
  },
  restaurant: {
    class: '.restaurants-swiper',
    config: {
      direction: 'horizontal',
      loop: true,
      freeMode: true,
      pagination: true,
      allowTouchMove: true,
      breakpoints: {
        480: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        1281: {
          slidesPerView: 3,
          spaceBetween: 48,
        },
      },
    },
  },
  events: {
    class: '.events-slider',
    config: {
      direction: 'horizontal',
      // slidesPerView: 3,
      // spaceBetween: 48,
      loop: false,
      freeMode: true,
      pagination: true,
      allowTouchMove: true,
      breakpoints: {
        480: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        1281: {
          slidesPerView: 3,
          spaceBetween: 48,
        },
      },
    },
  },
  promo: {
    class: '.promo-slider',
    config: {
      direction: 'horizontal',
      // slidesPerView: 3,
      // spaceBetween: 48,
      loop: true,
      freeMode: true,
      pagination: true,
      allowTouchMove: true,
      breakpoints: {
        480: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        1281: {
          slidesPerView: 3,
          spaceBetween: 48,
        },
      },
    },
  },
  deliveryMobile: {
    class: '.catalog-delivery-slider',
    config: {
      direction: 'horizontal',
      slidesPerView: 4,
      spaceBetween: 4,
      loop: true,
      freeMode: true,
      pagination: false,
      allowTouchMove: true,
    },
  },

  sectionMenuMobile: {
    class: '.section-menu-mobile',
    config: {
      direction: 'horizontal',
      slidesPerView: 'auto',
      spaceBetween: 6,
      loop: true,
      freeMode: true,
      pagination: false,
      allowTouchMove: true,
    },
  },
  deliveryFooterMobile: {
    class: '.delivery-footer-menu',
    config: {
      direction: 'vertical',
      slidesPerView: 10,
      // spaceBetween: 4,
      // loop: false,
      loop: false,
      freeMode: true,
      pagination: false,
      allowTouchMove: true,
    },
  },
  restauranTagsRow: {
    class: '.restaurant-tags-row',
    config: {
      direction: 'horizontal',
      slidesPerView: 3,
      loop: false,
      freeMode: true,
      pagination: false,
      allowTouchMove: true,
    },
  },
  aboutRestaurantPhotos: {
    class: '.about-restaurant-photos',
    config: {
      direction: 'horizontal',
      slidesPerView: 1,
      // spaceBetween: 3000,
      spaceBetween: 8,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      freeMode: false,
      effect: 'fade',
      centeredSlides: true,

      breakpoints: {
        480: {
          slidesPerView: 1,
          spaceBetween: 8,
        },
        1280: {
          slidesPerView: 1,
          spaceBetween: 3000,
        },
      },
    },
  },
  aboutRestaurantTags: {
    class: '.about-restaurant .footer-tags',
    config: {
      direction: 'horizontal',
      slidesPerView: 3,
      loop: false,
      freeMode: true,
      pagination: false,
      allowTouchMove: true,
    },
  },

  restaurantFilterTags: {
    class: '.restaurant-filter-tags',
    config: {
      direction: 'horizontal',
      slidesPerView: 4,
      loop: false,
      freeMode: true,
      pagination: false,
      allowTouchMove: true,
    },
  },

  deliveryBanner: {
    class: '.delivery-banner-slider',
    config: {
      direction: 'horizontal',
      slidesPerView: 1,
      centeredSlides: true,
      speed: 500,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      loop: true,
      freeMode: false,
      // effect : 'fade',
    },
  },

  dishTypeSlider: {
    class: '.dish-type-slider',
    config: {
      direction: 'horizontal',
      loop: false,
      freeMode: true,
      pagination: true,
      allowTouchMove: true,
      breakpoints: {
        320: {
          slidesPerView: 'auto',
          spaceBetween: 12,
        },
        1240: {
          slidesPerView: 4,
          spaceBetween: 17,
        },
        1430: {
          slidesPerView: 'auto',
          spaceBetween: 17,
        },
      },
    },
  },
  dishSlider: {
    class: '.dish-slider',
    config: {
      direction: 'horizontal',
      loop: false,
      freeMode: true,
      pagination: true,
      allowTouchMove: true,
      breakpoints: {
        320: {
          slidesPerView: 'auto',
          spaceBetween: 12,
        },
        1281: {
          slidesPerView: 'auto',
          spaceBetween: 12,
        },
      },
    },
  },

  initSlider: function (slideType) {
    const container = document.querySelector(slideType.class);

    if (container) {
      slideType.slider = new Swiper(slideType.class, {
        ...slideType.config,
        navigation: {
          nextEl: container.querySelector('.arrow--right'),
          prevEl: container.querySelector('.arrow--left'),
        },
      });

      // Добавление обработчика для mainBanner.slider
      if (slideType.class === '.banner-slider') {
        slideType.slider.on('slideChange', this.mainBannerHandler);
      }
    }
  },

  init: function () {
    this.initSlider(this.mainBanner);

    this.initSlider(this.restaurant);
    tags.initTags(this.restaurant.class, { iconMobile: false, iconDesktop: true });

    this.initSlider(this.events);
    this.initSlider(this.promo);

    this.initSlider(this.deliveryBanner);
    this.initSlider(this.dishTypeSlider);
    this.initSlider(this.dishSlider);
    this.initSlider(this.sectionMenuMobile);

    this.aboutRestaurantPhotos.config.effect = window.innerWidth <= 480 ? 'slide' : 'fade';
    this.initSlider(this.aboutRestaurantPhotos);

    this.initMobileSlider(this.deliveryMobile);
    this.initMobileSlider(this.deliveryFooterMobile);
    this.initMobileSlider(this.restauranTagsRow);
    this.initMobileSlider(this.aboutRestaurantTags);
    this.initMobileSlider(this.restaurantFilterTags);
  },

  mainBannerHandler: function (e) {
    const swiper = e.el;
    const slide = swiper.querySelector('.swiper-slide-visible');
    const bg = slide.dataset.bg;
    if (bg) {
      swiper.parentElement.style.backgroundColor = bg;
    } else {
      swiper.parentElement.style.backgroundColor = 'transparent';
    }
  },

  initMobileSlider: function (obj) {
    if (window.innerWidth > 480) {
      return;
    }
    this.initSlider(obj);
  },
};

let animation = {
  slideDown: function (element, duration, display = 'block') {
    element.style.display = display;
    element.style.height = '0px';

    let lastHeight = element.offsetHeight;
    element.style.height = 'auto';
    let fullHeight = element.offsetHeight;
    element.style.height = '0px';

    let totalHeightChange = fullHeight - lastHeight;
    let totalDurationMs = duration * 1000;
    let heightChangePerMs = totalHeightChange / totalDurationMs;

    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      let progress = timestamp - start;
      let newHeight = Math.min(lastHeight + progress * heightChangePerMs, fullHeight);
      element.style.height = newHeight + 'px';
      if (progress < totalDurationMs) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  },

  slideUp: function (element, duration) {
    let fullHeight = element.offsetHeight;

    let totalDurationMs = duration * 1000;
    let heightChangePerMs = fullHeight / totalDurationMs;

    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      let progress = timestamp - start;
      let newHeight = Math.max(fullHeight - progress * heightChangePerMs, 0);
      element.style.height = newHeight + 'px';
      if (progress < totalDurationMs) {
        window.requestAnimationFrame(step);
      } else {
        element.style.display = 'none';
      }
    }
    window.requestAnimationFrame(step);
  },
};

let readMore = {
  init: function () {
    const links = document.querySelectorAll('[data-readmore]');
    let shownLinks = [];
    links?.forEach((link) => {
      content = link.previousElementSibling;
      if (content) {
        const heights = readMore.getHeights(content);
        if (heights.fullHeight > heights.maxHeight) {
          link.classList.add('show');
          shownLinks.push(link);
        }
      }

      shownLinks?.forEach((link) => {
        link.addEventListener('click', (e) => {
          content = link.previousElementSibling;
          content.style.maxHeight = 'none';
          animation.slideDown(content, 0.5, 'flex');
          link.classList.remove('show');
        });
      });
    });
  },

  getHeights: function (content) {
    if (content) {
      const computedStyle = getComputedStyle(content);
      //const originalMaxHeight = parseInt(computedStyle.maxHeight, 10);
      const originalMaxHeight = computedStyle.maxHeight;
      content.style.maxHeight = 'none';
      const fullHeight = content.offsetHeight;
      content.style.maxHeight = originalMaxHeight;
      return { maxHeight: parseInt(computedStyle.maxHeight, 10), fullHeight: fullHeight };
    }
  },
};

youtube = {
  init: function () {
    const containers = document.querySelectorAll('[youtubeVideo]');

    if (containers.length > 0) {
      let tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      let firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      let players = [];
      let done = false; // вы можете использовать массив, если для каждого плеера нужны разные значения done

      window.onYouTubeIframeAPIReady = function () {
        containers.forEach((container, index) => {
          const videoId = container.getAttribute('youtubeVideo');
          size = {};
          if (window.innerWidth > 880) {
            size.width = 880;
            size.height = 534;
          } else if (window.innerWidth < 880) {
            size.width = window.innerWidth - 32;
            size.height = (window.innerWidth - 32) / 1.4;
          }

          console.log(size);

          players[index] = new YT.Player(container, {
            height: size.height,
            width: size.width,
            videoId: videoId,
            events: {
              onReady: onPlayerReady,
              onStateChange: onPlayerStateChange,
            },
          });
        });
      };

      window.onPlayerReady = function (event) {
        //event.target.playVideo();
      };

      window.onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 1000);
          done = true;
        }
      };

      window.stopVideo = function () {
        player.stopVideo();
      };
    }
  },
};

afterLoaded(() => {
  menu.init();
  slider.init();
  readMore.init();
  youtube.init();
});
