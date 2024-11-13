import { Link } from 'react-router-dom';
import { useFetchData } from '../../Utils'
import './CategoriesSidebar.scss'
import { Category, Product } from '../../types/Product';

const CategoriesSidebar = ({ products }: { products: Product[] }) => {
   const categories: Category[] = useFetchData('https://dummyjson.com/products/categories')
      .map((category: string) => ({ name: category }));
      
   const uniqueBrandNames = [...new Set(products.map(product => product.brand))];
   console.log("unique", uniqueBrandNames);
  
   return (
    <div className='categories_sidebar'>
      <div className="sidebar__component">
        <h1>Shop by categories</h1>
        <ul>
          {categories && categories.map((category, index) => (
            <li key={index}>
              <Link to={`/category/${category.name}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar__component">
        <h1>Your favorite brands</h1>
        <ul>
          {products && uniqueBrandNames.map((brand, index) => (
            <li key={index}>{brand}</li>
          ))}
        </ul>
      </div>
    </div>
   )
}

export default CategoriesSidebar
