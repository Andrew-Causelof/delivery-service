import { useCartStore } from '../../stores/cartStore';

function ServiceTypeDesktop() {
  const { deliveryType, setDeliveryType } = useCartStore();

  return (
    <ul className="delivery">
      <li>
        <input
          type="radio"
          id="option-delivery"
          name="delivery-cart"
          value="delivery"
          checked={deliveryType === 'delivery'}
          onChange={() => setDeliveryType('delivery')}
        />
        <label
          htmlFor="option-delivery"
          className="noselect"
          onClick={() => setDeliveryType('delivery')}
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
          onChange={() => setDeliveryType('pickup')}
        />
        <label
          htmlFor="option-pickup"
          className="noselect"
          onClick={() => setDeliveryType('pickup')}
        >
          Навынос
        </label>
      </li>
    </ul>
  );
}

export default ServiceTypeDesktop;
