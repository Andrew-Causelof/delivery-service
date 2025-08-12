import React, { useEffect, useState } from 'react';
import { useProductStore } from '../../stores/productStore';
import MenuDesktopSkeleton from './MenuDesktopSkeleton';
import { useUIStore } from '../../stores/uiStore';

function MenuDesktop() {
  // const { sections, loading } = useProductStore();
  const sections = useProductStore((state) => state.sections);
  const selectedFilters = useProductStore((state) => state.selectedFilters);
  const isLoading = useProductStore((state) => state.loading);
  const { activeTab, setActiveTab } = useUIStore();

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

  useEffect(() => {
    const sectionElements = document.querySelectorAll('[data-section]');
    const options = {
      root: null,
      rootMargin: '0px 0px -70% 0px', // позволяет считать секцию активной, когда она вошла на 30% сверху
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slug = entry.target.getAttribute('data-section');
          if (slug) setActiveTab(slug);
        }
      });
    }, options);

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el));
    };
  }, [filteredSections]);

  useEffect(() => {
    if (filteredSections.length && activeTab === '') {
      setActiveTab(filteredSections[0].slug);
    }
  }, [filteredSections]);

  const handleOnClick = (tab: string) => {
    setActiveTab(tab);
    const section = document.querySelector(`[data-section="${tab}"]`);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) return <MenuDesktopSkeleton />;

  return (
    <div className="menu">
      {filteredSections.map((item) => (
        <div
          key={item.slug}
          className={`menu-item ${activeTab === item.slug ? 'active' : ''}`}
          onClick={() => handleOnClick(item.slug)}
        >
          <div className="pic">
            <img src={item.img} alt={item.title} />
          </div>
          <a className="link">{item.title}</a>
        </div>
      ))}
    </div>
  );
}

export default MenuDesktop;
