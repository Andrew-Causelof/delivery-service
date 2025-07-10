import React, { useState } from 'react';

interface DishProps {
  id: number;
  href: string;
  img: string;
  name: string;
  price: number;
  weight: string;
}

const Dish: React.FC<DishProps> = ({ id, href, img, name, price, weight }) => {
  const [quantity, setQuantity] = useState<number>(1);

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
        <input
          name=""
          type=""
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="quantity-input"
        />
        <button className="increment-btn"></button>
      </div>
    </div>
  );
};

export default Dish;
