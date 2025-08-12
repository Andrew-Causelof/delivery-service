import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../stores/cartStore';
import { useNotification } from '../../context/NotificationContext';

function Promo() {
  const [couponCode, setCouponCode] = useState('');

  const { couponApplied, coupon, deliveryType, applyCoupon, discount, removeCoupon } =
    useCartStore();

  const notyf = useNotification();

  useEffect(() => {
    if (couponApplied) {
      setCouponCode(coupon);
    }
  }, [couponApplied, coupon]);

  const handleCancelClick = async () => {
    const result = await removeCoupon();
    console.log(result);

    if (result.success) notyf.success(result.message);
    else notyf.error(result.message || 'Неизвестная ошибка при применении промокода');
  };

  const handleApplyClick = async () => {
    const result = await applyCoupon(couponCode);

    console.log(result);

    if (result.success) notyf.success(result.message);
    else notyf.error(result.message || 'Неизвестная ошибка при применении промокода');
  };

  if (deliveryType === 'pickup') {
    return null;
  }
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
            {couponCode.length > 0 ? 'Применить' : ''}
          </button>
        )}
      </div>
      {couponApplied && discount.length > 0 && (
        <div className="promo-desc">
          <span className="title">Скидка по промокоду:</span>
          <span className="value">-{discount.toLocaleString('ru-RU')}</span>
        </div>
      )}
    </div>
  );
}

export default Promo;
