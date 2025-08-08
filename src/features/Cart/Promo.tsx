import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../stores/cartStore';

function Promo() {
  const [couponCode, setCouponCode] = useState('');

  const { couponApplied, coupon, setCoupon } = useCartStore();

  useEffect(() => {
    setCoupon(coupon);
  }, [couponApplied, coupon]);

  const handleCancelClick = () => {};

  const handleApplyClick = () => {
    /* 
      Отправляем запрос на сервер, получаем ответ
      если ответ положительный, то устанавливаем промокод
      Получаем скидку и выводим ее 
    */
  };

  return (
    <div className="promo">
      <div className="promo-code">
        <input
          type="text"
          placeholder="ввести промокод"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {couponApplied ? (
          <button className="submit-code cancel" onClick={() => handleCancelClick()}>
            Отменить
          </button>
        ) : (
          <button className="submit-code" onClick={() => handleApplyClick()}>
            Применить
          </button>
        )}
      </div>
      {couponApplied && (
        <div className="promo-desc">
          <span className="title">Скидка по промокоду:</span>
          <span className="value">-1 590</span>
        </div>
      )}
    </div>
  );
}

export default Promo;
