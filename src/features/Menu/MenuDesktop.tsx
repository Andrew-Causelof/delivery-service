import React, { useEffect, useState } from 'react';
import { useProductStore } from '../../stores/productStore';

function MenuDesktop() {
  const { sections, loading } = useProductStore();

  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    if (sections.length) {
      setActiveTab(sections[0].slug);
    }
  }, [sections]);

  const handleOnClick = (tab: string) => {
    setActiveTab(tab);
    console.log(tab);
    const section = document.querySelector(`[data-section="${tab}"]`);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="menu">
      {sections.map((item) => (
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
