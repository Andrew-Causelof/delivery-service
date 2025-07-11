import React from 'react';
import Section from './Section';
import Card from '../Product/Card';
import { useProductStore } from '../../stores/productStore';

function SectionList() {
  const sections = useProductStore((state) => state.sections);
  const selectedFilters = useProductStore((state) => state.selectedFilters);

  const filteredSections =
    selectedFilters.length === 0
      ? sections
      : sections
          .map((section) => ({
            ...section,
            items: section.items.filter((item) =>
              Object.keys(item.filterList).some((tag) => selectedFilters.includes(tag))
            ),
          }))
          .filter((section) => section.items.length > 0);

  return (
    <>
      {filteredSections.map((item) => (
        <Section title={item.title} desc={item.desc} slug={item.slug} key={item.slug}>
          {item.items.map((product) => (
            <Card key={item.slug + '_' + product.id} dish={product} />
          ))}
        </Section>
      ))}
    </>
  );
}

export default SectionList;
