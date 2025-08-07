import React from 'react';
import Section from './Section';
import Card from '../Product/Card';
import CardSkeleton from './CardSkeleton';
import { useProductStore } from '../../stores/productStore';

function SectionList() {
  const sections = useProductStore((state) => state.sections);
  const selectedFilters = useProductStore((state) => state.selectedFilters);
  const isLoading = useProductStore((state) => state.loading);

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

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, sectionIdx) => (
          <Section
            key={`skeleton-section-${sectionIdx}`}
            title="Загрузка секции..."
            desc="Пожалуйста, подождите"
            slug={`skeleton-${sectionIdx}`}
          >
            <div className="skeleton-cards-wrapper">
              {Array.from({ length: 4 }).map((_, cardIdx) => (
                <CardSkeleton key={`skeleton-card-${cardIdx}`} />
              ))}
            </div>
          </Section>
        ))}
      </>
    );
  }

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
