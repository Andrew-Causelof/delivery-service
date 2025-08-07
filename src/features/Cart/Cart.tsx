import ServiceTypeDesktop from '../Order/ServiceTypeDesktop';
import Dish from './Dish';
import Promo from './Promo';
import { useCartStore } from '../../stores/cartStore';

function Cart() {
  const { items } = useCartStore();

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
          {items.map((item) => (
            <Dish key={item.id} dish={item} />
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
