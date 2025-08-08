import { useCartStore } from '../../stores/cartStore';

function ServiceTypeMobile() {
  const { deliveryType, setDeliveryType } = useCartStore();

  return (
    <section className="service-type-mobile">
      <ul className="delivery">
        <li>
          <input
            type="radio"
            id="option-delivery-mobile"
            name="option-delivery-mobile"
            value="delivery"
            checked={deliveryType == 'delivery'}
            onChange={() => setDeliveryType('delivery')}
          />
          <label
            htmlFor="option-delivery-mobile"
            className="noselect"
            onClick={() => setDeliveryType('delivery')}
          >
            Доставка
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="option-pickup-mobile"
            name="option-pickup-mobile"
            value="pickup"
            checked={deliveryType == 'pickup'}
            onChange={() => setDeliveryType('pickup')}
          />
          <label
            htmlFor="option-pickup-mobile"
            className="noselect"
            onClick={() => setDeliveryType('pickup')}
          >
            Навынос
          </label>
        </li>
      </ul>
    </section>
  );
}

export default ServiceTypeMobile;
