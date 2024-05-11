import { useFetchData } from '../../Utils'
import './CategoriesSidebar.scss'
const CategoriesSidebar = ({products}:{products: Product[]}) => {
   const categories: string[] = useFetchData('https://dummyjson.com/products/categories')
  const uniqueBrandNames = [...new Set(products.map(product => product.brand))];
  return (
    <div className='categories_sidebar'>
        <div className="sidebar__component">
            <h1>Shop by categories</h1>
        <ul>
            {categories && categories.map((category) => <li key={category}>{category}</li>)}
        </ul>
      </div>
        <div className="sidebar__component">
        <h1>Your favorite brands</h1>
        <ul>
            {products && uniqueBrandNames.map((category) => <li key={category}>{category}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default CategoriesSidebar
