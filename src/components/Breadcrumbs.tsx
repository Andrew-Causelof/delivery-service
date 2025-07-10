import React from 'react';

function Breadcrumbs() {
  return (
    <section className="page-title">
      <ul className="breadcrumbs">
        <li>
          <a href="/">Главная</a>
        </li>
        <li>Доставка</li>
      </ul>
      <div className="group">
        <h1>Доставка блюд из ресторана «Дюшес»</h1>
      </div>
    </section>
  );
}

export default Breadcrumbs;
