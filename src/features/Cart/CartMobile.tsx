import React from 'react';
import { useUIStore } from '../../stores/uiStore';

function CartMobile() {
  const { cartMobile, setCartMobile } = useUIStore();

  return (
    <div className={`basket-mobile-container ${cartMobile ? 'active' : ''}`}>
      <div className="page-title">
        <a href="" className="back" onClick={() => setCartMobile(false)}>
          Назад
        </a>
        <span>Корзина</span>
        <a href="" className="clear-cart">
          Очистить
        </a>
      </div>

      <ul className="delivery">
        <li>
          <input type="radio" id="option-delivery" name="delivery-cart" value="delivery" checked />
          <label htmlFor="option-delivery" className="noselect">
            Доставка
          </label>
        </li>
        <li>
          <input type="radio" id="option-pickup" name="delivery-cart" value="pickup" />
          <label htmlFor="option-pickup" className="noselect">
            Навынос
          </label>
        </li>
      </ul>

      <div className="dishes">
        <div className="dish-frame">
          <div className="img-container">
            <img
              src="http://dushes-cafe.seo-gravity.ru/upload/iblock/8f0/zr570shv5x20542pkh7yvbro1aujvnuh.jpg"
              alt=""
            />
          </div>
          <div className="dish-item">
            <a href="" className="dish-item-name">
              Ассорти Шашлыков (свинина, телятина, курица)
            </a>
            <div className="dish-item-additional">
              <span className="price">2360</span>
              <div className="weight">1 295 г</div>
            </div>
          </div>
          <div className="quantity-selector">
            <button className="decrement-btn"></button>
            <input name="persons" type="persons" value="1" min="1" className="quantity-input" />
            <button className="increment-btn"></button>
          </div>
        </div>
        <div className="dish-frame">
          <div className="img-container">
            <img
              src="http://dushes-cafe.seo-gravity.ru/upload/iblock/8f0/zr570shv5x20542pkh7yvbro1aujvnuh.jpg"
              alt=""
            />
          </div>
          <div className="dish-item">
            <a href="" className="dish-item-name">
              Ассорти Шашлыков (свинина, телятина, курица)
            </a>
            <div className="dish-item-additional">
              <span className="price">2360</span>
              <div className="weight">1 295 г</div>
            </div>
          </div>
          <div className="quantity-selector">
            <button className="decrement-btn"></button>
            <input name="persons" type="persons" value="1" min="1" className="quantity-input" />
            <button className="increment-btn"></button>
          </div>
        </div>
        <div className="dish-frame">
          <div className="img-container">
            <img
              src="http://dushes-cafe.seo-gravity.ru/upload/iblock/8f0/zr570shv5x20542pkh7yvbro1aujvnuh.jpg"
              alt=""
            />
          </div>
          <div className="dish-item">
            <a href="" className="dish-item-name">
              Ассорти Шашлыков (свинина, телятина, курица)
            </a>
            <div className="dish-item-additional">
              <span className="price">2360</span>
              <div className="weight">1 295 г</div>
            </div>
          </div>
          <div className="quantity-selector">
            <button className="decrement-btn"></button>
            <input name="persons" type="persons" value="1" min="1" className="quantity-input" />
            <button className="increment-btn"></button>
          </div>
        </div>
        <div className="dish-frame">
          <div className="img-container">
            <img
              src="http://dushes-cafe.seo-gravity.ru/upload/iblock/8f0/zr570shv5x20542pkh7yvbro1aujvnuh.jpg"
              alt=""
            />
          </div>
          <div className="dish-item">
            <a href="" className="dish-item-name">
              Ассорти Шашлыков (свинина, телятина, курица)
            </a>
            <div className="dish-item-additional">
              <span className="price">2360</span>
              <div className="weight">1 295 г</div>
            </div>
          </div>
          <div className="quantity-selector">
            <button className="decrement-btn"></button>
            <input name="persons" type="persons" value="1" min="1" className="quantity-input" />
            <button className="increment-btn"></button>
          </div>
        </div>
        <div className="dish-frame">
          <div className="img-container">
            <img
              src="http://dushes-cafe.seo-gravity.ru/upload/iblock/8f0/zr570shv5x20542pkh7yvbro1aujvnuh.jpg"
              alt=""
            />
          </div>
          <div className="dish-item">
            <a href="" className="dish-item-name">
              Ассорти Шашлыков (свинина, телятина, курица)
            </a>
            <div className="dish-item-additional">
              <span className="price">2360</span>
              <div className="weight">1 295 г</div>
            </div>
          </div>
          <div className="quantity-selector">
            <button className="decrement-btn"></button>
            <input name="persons" type="persons" value="1" min="1" className="quantity-input" />
            <button className="increment-btn"></button>
          </div>
        </div>
        <div className="dish-frame">
          <div className="img-container">
            <img
              src="http://dushes-cafe.seo-gravity.ru/upload/iblock/8f0/zr570shv5x20542pkh7yvbro1aujvnuh.jpg"
              alt=""
            />
          </div>
          <div className="dish-item">
            <a href="" className="dish-item-name">
              Ассорти Шашлыков (свинина, телятина, курица)
            </a>
            <div className="dish-item-additional">
              <span className="price">2360</span>
              <div className="weight">1 295 г</div>
            </div>
          </div>
          <div className="quantity-selector">
            <button className="decrement-btn"></button>
            <input name="persons" type="persons" value="1" min="1" className="quantity-input" />
            <button className="increment-btn"></button>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="detail">
          <div className="promo">
            <div className="promo-code">
              <input type="text" placeholder="ввести промокод" />
              <button className="submit-code">Применить</button>
            </div>
            <div className="promo-desc">
              <span className="title">Скидка по промокоду:</span>
              <span className="value">-1 590</span>
            </div>
          </div>

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
    </div>
  );
}

export default CartMobile;
