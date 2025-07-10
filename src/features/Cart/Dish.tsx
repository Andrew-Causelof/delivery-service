import React from 'react';

interface DishProps {
  id: number;
  href: string;
  img: string;
  name: string;
  price: number;
  weight: string;
}

const Dish: React.FC<DishProps> = ({ id, href, img, name, price, weight }) => {
  return (
    <div className="dish-frame">
      <div className="img-container">
        <img src={img} alt={name} />
      </div>
      <div className="dish-item">
        <a href={href} className="dish-item-name">
          {name}
        </a>
        <div className="dish-item-additional">
          <span className="price">2360</span>
          <div className="weight">1 295 г</div>
        </div>
      </div>
      <div className="quantity-selector">
        <button className="decrement-btn"></button>
        <input name="persons" type="persons" value="1" min="1" className="quantity-input" />
        <button className="increment-btn"></button>
      </div>
    </div>
  );
};

export default Dish;
