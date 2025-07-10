import React from 'react';

function OrderButtonMobile() {
  return (
    <section className="order-button-mobile">
      <button id="order-button-mobile">
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
