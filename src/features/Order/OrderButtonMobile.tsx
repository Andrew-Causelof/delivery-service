import { useUIStore } from '../../stores/uiStore';
import { useCartStore } from '../../stores/cartStore';

function OrderButtonMobile() {
  const { setCartMobile } = useUIStore();
  const { items, totalPrice, leadTime } = useCartStore();
  return (
    <section className="order-button-mobile">
      <button id="order-button-mobile" onClick={() => setCartMobile(true)}>
        <span>В корзину</span>
        <div className="group">
          <span className="price">{totalPrice.replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1')}</span>
          {items.length > 0 && <span className="leadtime">{leadTime}</span>}
        </div>
      </button>
    </section>
  );
}

export default OrderButtonMobile;
