import { useCartStore } from '../../stores/cartStore';

function ServiceType({ tag }: { tag?: string }) {
  const { deliveryType, setDeliveryType } = useCartStore();

  return (
    <ul className="delivery">
      <li>
        <input
          type="radio"
          id={`option-delivery-${tag}`}
          name={`delivery-cart-${tag}`}
          value="delivery"
          checked={deliveryType === 'delivery'}
          onChange={() => setDeliveryType('delivery')}
        />
        <label
          htmlFor={`option-delivery-${tag}`}
          className="noselect"
          onClick={() => setDeliveryType('delivery')}
        >
          Доставка
        </label>
      </li>
      <li>
        <input
          type="radio"
          id={`option-pickup-${tag}`}
          name={`delivery-cart-${tag}`}
          value="pickup"
          checked={deliveryType === 'pickup'}
          onChange={() => setDeliveryType('pickup')}
        />
        <label
          htmlFor={`option-pickup-${tag}`}
          className="noselect"
          onClick={() => setDeliveryType('pickup')}
        >
          Навынос
        </label>
      </li>
    </ul>
  );
}

export default ServiceType;
