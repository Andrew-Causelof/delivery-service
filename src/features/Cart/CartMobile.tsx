import { useUIStore } from '../../stores/uiStore';
import ServiceType from '../Order/ServiceType';
import { useCartStore } from '../../stores/cartStore';

import DishMobile from './DishMobile';
import Promo from './Promo';

function CartMobile() {
  const { cartMobile, setCartMobile } = useUIStore();
  const { items, totalPrice, getDeliveryLabel, clearCart, leadTime } = useCartStore();

  return (
    <div className={`basket-mobile-container ${cartMobile ? 'active' : ''}`}>
      <div className="page-title">
        <a className="back" onClick={() => setCartMobile(false)}>
          Назад
        </a>
        <span>Корзина</span>

        {items.length > 0 && (
          <a className="clear-cart" onClick={() => clearCart()}>
            Очистить
          </a>
        )}
      </div>

      <ServiceType tag="mobile" />

      <div className="dishes">
        {items.map((item) => (
          <DishMobile key={item.id} dish={item} />
        ))}
      </div>

      <div className="bottom">
        <div className="detail">
          <Promo />

          {/* <div className="promo">
            <div className="promo-code">
              <input type="text" placeholder="ввести промокод" />
              <button className="submit-code">Применить</button>
            </div>
            <div className="promo-desc">
              <span className="title">Скидка по промокоду:</span>
              <span className="value">-1 590</span>
            </div>
          </div> */}

          <div className="info">
            <div className="info-item">
              <span className="name">Способ получения:</span>
              <span className="value">{getDeliveryLabel()}</span>
            </div>

            {items.length > 0 && (
              <div className="info-item">
                <span className="name">Время доставки:</span>
                <span className="value">{leadTime}</span>
              </div>
            )}
          </div>
        </div>

        <a href="/basket/" className="order-submit">
          <span className="msg"> Верно, к оформлению</span>
          <span className="amount">{totalPrice.replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1')} ₽</span>
        </a>
      </div>
    </div>
  );
}

export default CartMobile;
