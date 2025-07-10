import React from 'react';
import ServiceTypeDesktop from '../Order/ServiceTypeDesktop';
import Dish from './Dish';
import Promo from './Promo';

const cardItems = [
  {
    id: 34,
    img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/8f0/zr570shv5x20542pkh7yvbro1aujvnuh.jpg',
    name: 'Ассорти Шашлыков (свинина, телятина, курица)',
    price: 2360,
    weight: '1 295 г',
    href: '',
  },
  {
    id: 35,
    img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/8f0/zr570shv5x20542pkh7yvbro1aujvnuh.jpg',
    name: 'Ассорти Шашлыков (свинина, телятина, курица)',
    price: 2360,
    weight: '1 295 г',
    href: '',
  },
  {
    id: 36,
    img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/8f0/zr570shv5x20542pkh7yvbro1aujvnuh.jpg',
    name: 'Ассорти Шашлыков (свинина, телятина, курица)',
    price: 2360,
    weight: '1 295 г',
    href: '',
  },
  {
    id: 37,
    img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/8f0/zr570shv5x20542pkh7yvbro1aujvnuh.jpg',
    name: 'Ассорти Шашлыков (свинина, телятина, курица)',
    price: 2360,
    weight: '1 295 г',
    href: '',
  },
  {
    id: 38,
    img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/8f0/zr570shv5x20542pkh7yvbro1aujvnuh.jpg',
    name: 'Ассорти Шашлыков (свинина, телятина, курица)',
    price: 2360,
    weight: '1 295 г',
    href: '',
  },
];

function Cart() {
  const handleClearCart = () => {
    console.log('clear cart');
  };

  return (
    <>
      <div className="top">
        <div className="title">
          <span className="title-name">Корзина</span>
          <a className="cart-clear noselect" onClick={() => handleClearCart()}>
            Очистить
          </a>
        </div>
        <ServiceTypeDesktop />

        <div className="dishes">
          {cardItems.map((item) => (
            <Dish key={item.id} {...item} />
          ))}
        </div>
      </div>
      <div className="bottom">
        <div className="detail">
          <Promo />

          <div className="info">
            <div className="info-item">
              <span className="name">Способ получения:</span>
              <span className="value">Доставка</span>
            </div>

            <div className="info-item">
              <span className="name">Время доставки:</span>
              <span className="value">~60 мин</span>
            </div>
          </div>
        </div>

        <button className="order-submit">
          <span className="msg"> Верно, к оформлению</span>
          <span className="amount"> 5 141 ₽</span>
        </button>
      </div>
    </>
  );
}

export default Cart;
