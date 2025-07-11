import React, { useEffect, useState } from 'react';
import { useProductStore } from '../../stores/productStore';

function MenuDesktop() {
  // const { sections, loading } = useProductStore();
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

  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    if (filteredSections.length && activeTab === '') {
      setActiveTab(filteredSections[0].slug);
    }
  }, [filteredSections]);

  const handleOnClick = (tab: string) => {
    console.log('handleOnClick', tab);
    setActiveTab(tab);
    console.log(tab);
    const section = document.querySelector(`[data-section="${tab}"]`);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  console.log('filteredSections', filteredSections);
  console.log('activeTab', activeTab);

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
