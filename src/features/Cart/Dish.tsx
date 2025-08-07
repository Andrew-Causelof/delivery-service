import React, { useState } from 'react';
import type { Dish } from '../../types/catalog';
import { useCartStore } from '../../stores/cartStore';

type DishProps = {
  dish: Dish;
};

const Dish: React.FC<DishProps> = ({ dish }) => {
  const { id, img, name, price, weight } = dish;

  const { increment, decrement, items } = useCartStore();
  const item = items.find((i) => i.id === id);
  const quantity = item?.quantity || 0;

  console.log(items);

  return (
    <div className="dish-frame">
      <div className="group">
        <div className="img-container">
          <img src={img} alt={name} />
        </div>
        <div className="dish-item">
          <a className="dish-item-name">{name}</a>
          <div className="dish-item-additional">
            <span className="price">{price}</span>
            <div className="weight">{weight}</div>
          </div>
        </div>
      </div>

      <div className="quantity-selector">
        <button className="decrement-btn" onClick={() => decrement(id)}></button>
        <input
          name=""
          type="number"
          value={quantity}
          min={1}
          onChange={() => {}}
          readOnly
          className="quantity-input"
        />
        <button className="increment-btn" onClick={() => increment(id)}></button>
      </div>
    </div>
  );
};

export default Dish;
