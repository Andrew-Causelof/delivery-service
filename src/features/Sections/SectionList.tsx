import React from 'react';
import Section from './Section';
import Card from '../Product/Card';

const productList = [
  {
    title: 'Блюда на Мангале / Гриле',
    desc: '',
    slug: 'blyuda-na-mangale',
    items: [
      {
        id: 34,
        img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/8f0/zr570shv5x20542pkh7yvbro1aujvnuh.jpg',
        name: 'Салат из свежих овощей с тунцом и яйцом пашот',
        price: 520.0,
        weight: '280 г',
      },
      {
        id: 35,
        img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/1a5/egdkd893a5o1zqpvpjwe05pvlkksgckv.webp',
        name: 'Салат Столичный с куриным филе, перепелиным яйцом.',
        price: 420.0,
        weight: '280 г',
      },
      {
        id: 37,
        img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/878/2zo77v6e00cx25k3bpnnj5tvban4qm37.webp',
        name: 'Кюрза-пельмени из баранины жареные',
        price: 460.0,
        weight: '250 г',
      },
      {
        id: 38,
        img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/2e8/jif0zot9s4g7h2ju3kogwafc3t7ds3q9.webp',
        name: 'Самса из мраморной говядины "Блэк Ангус"',
        price: 160.0,
        weight: '250 г',
      },
      {
        id: 39,
        img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/013/isy1w908kjynbbdc56sm7z8i66y2zray.webp',
        name: 'Самса с тыквой и мятой',
        price: 140.0,
        weight: '250 г',
      },
      {
        id: 40,
        img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/288/227h87bzcpek5zudn0buxcuqcjs3a8ee.webp',
        name: 'Крем-суп из тыквы с креветками',
        price: 480.0,
        weight: '250 г',
      },
    ],
  },
  {
    title: 'Садж',
    desc: 'Садж — мясо и овощи, обжаренные на блюде с одноименным названием.Технология предполагает поэтапное обжаривание ингредиентов. Каждый последующий компонент, жарясь в соках предыдущего, напитывается его вкусами и ароматами, от чего еда приобретает неповторимый вкус',
    slug: 'sadj',
    items: [
      {
        id: 34,
        img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/8f0/zr570shv5x20542pkh7yvbro1aujvnuh.jpg',
        name: 'Салат из свежих овощей с тунцом и яйцом пашот',
        price: 520.0,
        weight: '280 г',
      },
      {
        id: 35,
        img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/1a5/egdkd893a5o1zqpvpjwe05pvlkksgckv.webp',
        name: 'Салат Столичный с куриным филе, перепелиным яйцом.',
        price: 420.0,
        weight: '280 г',
      },
      {
        id: 37,
        img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/878/2zo77v6e00cx25k3bpnnj5tvban4qm37.webp',
        name: 'Кюрза-пельмени из баранины жареные',
        price: 460.0,
        weight: '250 г',
      },
      {
        id: 38,
        img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/2e8/jif0zot9s4g7h2ju3kogwafc3t7ds3q9.webp',
        name: 'Самса из мраморной говядины "Блэк Ангус"',
        price: 160.0,
        weight: '250 г',
      },
      {
        id: 39,
        img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/013/isy1w908kjynbbdc56sm7z8i66y2zray.webp',
        name: 'Самса с тыквой и мятой',
        price: 140.0,
        weight: '250 г',
      },
      {
        id: 40,
        img: 'http://dushes-cafe.seo-gravity.ru/upload/iblock/288/227h87bzcpek5zudn0buxcuqcjs3a8ee.webp',
        name: 'Крем-суп из тыквы с креветками',
        price: 480.0,
        weight: '250 г',
      },
    ],
  },
];

function SectionList() {
  return (
    <>
      {productList.map((item) => (
        <Section title={item.title} desc={item.desc} slug={item.slug}>
          {item.items.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              img={product.img}
              name={product.name}
              price={product.price}
              weight={product.weight}
            />
          ))}
        </Section>
      ))}
    </>
  );
}

export default SectionList;
