const MenuDesktopSkeleton = () => {
  return (
    <div className="menu">
      {Array.from({ length: 10 }).map((_, i) => (
        <div className="menu-item shimmer" key={i}>
          <div className="pic skeleton-pic"></div>
          <div className="link skeleton-link"></div>
        </div>
      ))}
    </div>
  );
};

export default MenuDesktopSkeleton;
