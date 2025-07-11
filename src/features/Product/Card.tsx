import React, { useState } from 'react';
import { useCartStore } from '../../stores/cartStore';
import type { Dish } from '../../types/catalog';
import Modal from 'react-modal';
import { REACT_APP_ROOT } from '../../config.ts';

Modal.setAppElement(`#${REACT_APP_ROOT}`);

type Props = {
  dish: Dish;
};

const Card: React.FC<Props> = ({ dish }) => {
  const { id, img, name, price, weight } = dish;
  const { addItem, increment, decrement, items } = useCartStore();
  const item = items.find((i) => i.id === id);
  const quantity = item?.quantity || 0;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateAmout = (): number => {
    return quantity === 0 ? price : quantity * price;
  };

  return (
    <>
      <div className="plate-card" data-productid={id}>
        <div className="card-top" onClick={() => setIsModalOpen(true)}>
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
            {quantity === 0 ? (
              <button className="add-btn" onClick={() => addItem(dish)}>
                Добавить
              </button>
            ) : (
              <div className="quantity-selector">
                <button className="decrement-btn" onClick={() => decrement(id)} />
                <input
                  type="number"
                  value={quantity}
                  onChange={() => {}}
                  readOnly
                  className="quantity-input"
                />
                <button className="increment-btn" onClick={() => increment(id)} />
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel={name}
        className="modal"
        id="catalog-delivery-modal"
        overlayClassName="modal-overlay catalog-delivery-modal"
      >
        <div className="modal-content">
          <div className="frame-column">
            <div className="top">
              <div className="title">{name}</div>
              <div className="weight">{weight}</div>
              <span className="close" onClick={() => setIsModalOpen(false)}></span>
            </div>
            <div className="pic">
              <img src={img} alt={name} />
            </div>
            <div className="bottom">
              <div className="composition">Состав:</div>
              <div className="desc">
                Люля-кебаб телятина, люля-кебаб баранина, шашлык курица, шашлык телятина, шашлык
                баранина из мякоти, молодой картофель, шампиньоны на углях, нарезка из лука, лаваш
                тонкий, гранат, соус аджика.
              </div>
            </div>
          </div>
          <div className="frame-row">
            <div className="order-group">
              {quantity === 0 ? (
                <button type="button" className="add-to-basked" onClick={() => addItem(dish)}>
                  Добавить
                </button>
              ) : (
                <div className="quantity-selector">
                  <button className="decrement-btn" onClick={() => decrement(id)}></button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={() => {}}
                    readOnly
                    className="quantity-input"
                  />
                  <button className="increment-btn" onClick={() => increment(id)}></button>
                </div>
              )}
            </div>

            <div className="amount-group">
              <div className="title">Сумма:</div>
              <div className="group">
                <span className="amount">{calculateAmout().toLocaleString('ru-RU')}</span>
                <span className="currency">₽</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Card;
