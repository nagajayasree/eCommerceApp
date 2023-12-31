import React, { useEffect, useState, useMemo } from 'react';
import Product from './product';
import styles from './products-list.module.css';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    const url = 'https://dummyjson.com/products';
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        // console.log(result.products);
        setProducts(result.products);
        // let categories = [...new Set(result.products.map((p) => p.category))];
        // console.log(categories);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  function getFilteredList() {
    if (!selectedCategory) {
      return products;
    }
    return products.filter((item) => item.category === selectedCategory);
  }

  let filteredList = useMemo(getFilteredList, [selectedCategory, products]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  return (
    <div>
      <div>
        <select
          name="category-list"
          id="category-list"
          onChange={handleCategoryChange}
          className={styles.categoryDropdown}
        >
          <option value="">All</option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="fragrances">Fragrances</option>
          <option value="skincare">Skincare</option>
          <option value="groceries">Groceries</option>
          <option value="home-decoration">Home-decoration</option>
        </select>
      </div>
      <div className={styles.cardsList}>
        {filteredList.map((p) => (
          <div key={p.id}>
            <Product
              id={p.id}
              img={p.thumbnail}
              title={p.title}
              desc={p.description}
              price={`$${p.price}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
