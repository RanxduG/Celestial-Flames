import React, { useContext, useState, useEffect } from 'react';
import './AllCollections.css';
import { ShopContext } from '../../Context/ShopContext';
import Collections from '../Collections/Collections.jsx';

const NewCollections = () => {
  const { allProducts } = useContext(ShopContext);
  const [all_collection, setCollection] = useState([]);

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) return;

    const categoryMap = new Map();

    allProducts.forEach((product) => {
      const category = product.category;

      if (!categoryMap.has(category)) {
        categoryMap.set(category, {
          id: categoryMap.size + 1, // Incremental ID based on order of discovery
          name: category,
          image: product.imageUrl, // First product's image in the category
          total: 1, // Start count
        });
      } else {
        // If category already exists, just increment the total
        categoryMap.get(category).total += 1;
      }
    });

    // Convert Map values to array
    setCollection(Array.from(categoryMap.values()));
  }, [allProducts]);

  return (
    <div className="new-collections">
      <h1>ALL COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {all_collection.map((item) => (
          <Collections key={item.id} id={item.id} name={item.name} image={item.image} total={item.total} />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
