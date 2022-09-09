import React from "react";
export const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Covered"];
type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
}
export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
  
    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, i) => (
            <li
              key={i}
              onClick={() => onChangeCategory(i)}
              className={value === i ? "active" : ""}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
); 
