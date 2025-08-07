import { useEffect } from 'react';
import Breadcrumbs from './components/Breadcrumbs';
import ServiceTypeMobile from './features/Order/ServiceTypeMobile';
import MenuDesktop from './features/Menu/MenuDesktop';
import MenuMobile from './features/Menu/MenuMobile';
import Banner from './features/Banner/Banner';
import DishTypeFilter from './features/Sections/DishTypeFilter';
import SectionList from './features/Sections/SectionList';
import OrderButtonMobile from './features/Order/OrderButtonMobile';
import Cart from './features/Cart/Cart';

import { useProductStore } from './stores/productStore';
import { useCartStore } from './stores/cartStore';

function App() {
  const fetchSections = useProductStore((state) => state.fetchSections);
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <>
      <Breadcrumbs />
      <ServiceTypeMobile />
      <section className="product-category">
        <div className="container">
          <div className="sidebar-left">
            <MenuDesktop />
          </div>
          <div className="content-wrapper">
            <Banner />
            <MenuMobile />
            <DishTypeFilter />
            <SectionList />
            <OrderButtonMobile />
          </div>
          <div className="sidebar-right">
            <Cart />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
