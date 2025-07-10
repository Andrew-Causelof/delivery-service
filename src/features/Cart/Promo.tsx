import React from 'react';

function Promo() {
  return (
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
  );
}

export default Promo;
