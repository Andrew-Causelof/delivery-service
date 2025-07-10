import React from 'react';
import Section from './Section';
import Card from '../Product/Card';
import { useProductStore } from '../../stores/productStore';

function SectionList() {
  const { sections, loading } = useProductStore();

  return (
    <>
      {sections.map((item) => (
        <Section title={item.title} desc={item.desc} slug={item.slug} key={item.slug}>
          {item.items.map((product) => (
            <Card
              key={item.slug + '_' + product.id}
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
