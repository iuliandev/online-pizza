import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: React.FC = (props) => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="136" cy="145" r="125" />
      <rect x="0" y="288" rx="10" ry="10" width="280" height="20" />
      <rect x="0" y="324" rx="10" ry="10" width="280" height="88" />
      <rect x="2" y="425" rx="10" ry="10" width="90" height="35" />
      <rect x="168" y="420" rx="30" ry="30" width="109" height="45" />
    </ContentLoader>
  );
};
