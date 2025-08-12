import React from 'react';
import { useUIStore } from '../../stores/uiStore';

function OrderButtonMobile() {
  const { setCartMobile } = useUIStore();
  return (
    <section className="order-button-mobile">
      <button id="order-button-mobile" onClick={() => setCartMobile(true)}>
        <span>В корзину</span>
        <div className="group">
          <span className="price">5 141</span>
          <span className="leadtime">60-90</span>
        </div>
      </button>
    </section>
  );
}

export default OrderButtonMobile;
