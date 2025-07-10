import React from 'react';

interface CardProps {
  id: number;
  img: string;
  name: string;
  price: number;
  weight: string;
}

const Card: React.FC<CardProps> = ({ id, img, name, price, weight }) => {
  return (
    <div className="plate-card" data-productid={id}>
      <div className="card-top">
        <img src={img} alt="изображение для: Самса с тыквой и мятой" />
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
          <button className="add-btn">Добавить</button>

          <div className="quantity-selector hide">
            <button className="decrement-btn"></button>
            <input type="number" min="1" value="1" className="quantity-input" />
            <button className="increment-btn"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
