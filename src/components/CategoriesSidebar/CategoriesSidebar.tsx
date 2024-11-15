import { Link } from 'react-router-dom';
import { useFetchCategories } from '../../Utils'
import './CategoriesSidebar.scss'
import { Category, Product } from '../../types/Product';
import { useEffect, useState } from 'react';

const CategoriesSidebar = ({ products }: { products: Product[] }) => {
   const [categories, setCategories] = useState<Category[]>([]);
   const rawCategories = useFetchCategories('https://dummyjson.com/products/categories', 20);

   useEffect(() => {
     if (Array.isArray(rawCategories)) {
       setCategories(rawCategories);
     }
   }, [rawCategories]);
   
   const uniqueBrands = products && products.length > 0 
     ? Array.from(new Set(products.map(product => product.brand)))
       .filter(Boolean)
       .sort((a, b) => a.localeCompare(b))
     : [];
  
   return (
    <div className='categories_sidebar'>
      <div className="sidebar__component">
        <h1>Shop by categories</h1>
        <ul>
          {categories && categories.map((category, index) => (
            <li key={index}>
              <Link to={`/category/${category.slug}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      {uniqueBrands.length > 0 && (
        <div className="sidebar__component">
          <h1>Available Brands</h1>
          <ul>
            {uniqueBrands.map((brand, index) => (
              <li key={index}>{brand}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
   );
};

export default CategoriesSidebar;
