import React from 'react';

const CategoriesRow = ({ categories = [], onChange, selectedCategory }) => (
  <div className='categories-row product-categories-box'>
    <div className='categories-row-header'>
      <h3>Categorías</h3>
    </div>
    <div className='categories-row-content'>
      {categories.map(category => (
        <h6
          className={`pointer ${selectedCategory === category.id ? 'selected-category' : ''}`}
          key={category.id}
          onClick={() => onChange(category.id)}
        >
          {category.name}
        </h6>
      ))}
    </div>
  </div>
);

export default CategoriesRow;
