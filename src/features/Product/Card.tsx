import React, { useState } from 'react';

interface CardProps {
  id: number;
  img: string;
  name: string;
  price: number;
  weight: string;
}

const Card: React.FC<CardProps> = ({ id, img, name, price, weight }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleAdd = () => {
    setQuantity(2); // т.к. 1 уже был показан как "Добавить", следующий шаг — 2
  };
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="plate-card" data-productid={id}>
      <div className="card-top">
        <img src={img} alt={`изображение для: ${name}`} />
      </div>

      <div className="card-body">
        <div className="frame flex-column flex-start">
          <div className="price">
            <span className="new">{price}</span>
          </div>
          <div className="description">
            <div className="name">{name}</div>
            <div className="weight">{weight}</div>
          </div>
        </div>

        <div className="frame flex-row">
          {quantity === 1 && (
            <button className="add-btn" onClick={handleAdd}>
              Добавить
            </button>
          )}

          {quantity > 1 && (
            <div className="quantity-selector">
              <button className="decrement-btn" onClick={decrement}></button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="quantity-input"
              />
              <button className="increment-btn" onClick={increment}></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
