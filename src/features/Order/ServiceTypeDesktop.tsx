import { useState } from 'react';

function ServiceTypeDesktop() {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const handleDeliveryType = (type: 'delivery' | 'pickup') => {
    setDeliveryType(type);
  };
  return (
    <ul className="delivery">
      <li>
        <input
          type="radio"
          id="option-delivery"
          name="delivery-cart"
          value="delivery"
          checked={deliveryType === 'delivery'}
        />
        <label
          htmlFor="option-delivery"
          className="noselect"
          onClick={() => handleDeliveryType('delivery')}
        >
          Доставка
        </label>
      </li>
      <li>
        <input
          type="radio"
          id="option-pickup"
          name="delivery-cart"
          value="pickup"
          checked={deliveryType === 'pickup'}
        />
        <label
          htmlFor="option-pickup"
          className="noselect"
          onClick={() => handleDeliveryType('pickup')}
        >
          Навынос
        </label>
      </li>
    </ul>
  );
}

export default ServiceTypeDesktop;
