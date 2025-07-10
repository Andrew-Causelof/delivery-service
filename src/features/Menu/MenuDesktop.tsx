import React, { useState } from 'react';

function MenuDesktop() {
  type MenuItem = {
    name: string;
    image: string;
    link: string;
    slug: string;
  };

  const menuList: MenuItem[] = [
    {
      name: 'Холодные закуски',
      image: '/assets/img/menu/image_4.png',
      link: '',
      slug: 'kholodnye-zakuski',
    },
    {
      name: 'Салаты',
      image: '/assets/img/menu/image_5.png',
      link: '',
      slug: 'salaty',
    },
    {
      name: 'Горячие закуски',
      image: '/assets/img/menu/image_6.png',
      link: '',
      slug: 'goryachie-zakuski',
    },
    {
      name: 'Супы',
      image: '/assets/img/menu/image_7.png',
      link: '',
      slug: 'supy',
    },
    {
      name: 'Блюда в тандыре',
      image: '/assets/img/menu/image_8.png',
      link: '',
      slug: 'blyuda-v-tandyre',
    },
    {
      name: 'Блюда на мангале',
      image: '/assets/img/menu/image_9.png',
      link: '',
      slug: 'blyuda-na-mangale',
    },
    {
      name: 'Садж',
      image: '/assets/img/menu/image_10.png',
      link: '',
      slug: 'sadj',
    },
    {
      name: 'Горячие блюда',
      image: '/assets/img/menu/image_11.png',
      link: '',
      slug: 'goryachie-blyuda',
    },
    {
      name: 'Плов',
      image: '/assets/img/menu/image_12.png',
      link: '',
      slug: 'plov',
    },
    {
      name: 'Детское меню',
      image: '/assets/img/menu/image_13.png',
      link: '',
      slug: 'detskoe-menyu',
    },
    {
      name: 'Гарниры',
      image: '/assets/img/menu/image_23.png',
      link: '',
      slug: 'garniry',
    },
    {
      name: 'Десерты',
      image: '/assets/img/menu/image_24.png',
      link: '',
      slug: 'deserty',
    },
    {
      name: 'Домашние лимонады',
      image: '/assets/img/menu/image_25.png',
      link: '',
      slug: 'domashnie-limonady',
    },
    {
      name: 'Свежевыжатые соки',
      image: '/assets/img/menu/image_26.png',
      link: '',
      slug: 'svezhevyzhatye-soki',
    },
    {
      name: 'Соусы',
      image: '/assets/img/menu/image_27.png',
      link: '',
      slug: 'sousy',
    },
    {
      name: 'Сезонное меню',
      image: '/assets/img/menu/image_28.png',
      link: '',
      slug: 'sezonnoe-menyu',
    },
    {
      name: 'Предварительный заказ',
      image: '/assets/img/menu/image_29.png',
      link: '',
      slug: 'predvaritelnyi-zakaz',
    },
  ];

  const [activeTab, setActiveTab] = useState<string>('kholodnye-zakuski');

  const handleOnClick = (tab: string) => {
    setActiveTab(tab);
    const section = document.getElementById(tab);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="menu">
      {menuList.map((item) => (
        <div
          key={item.slug}
          className={`menu-item ${activeTab === item.slug ? 'active' : ''}`}
          onClick={() => handleOnClick(item.slug)}
        >
          <div className="pic">
            <img src={item.image} alt={item.name} />
          </div>
          <a href="#" className="link">
            {item.name}
          </a>
        </div>
      ))}
    </div>
  );
}

export default MenuDesktop;
