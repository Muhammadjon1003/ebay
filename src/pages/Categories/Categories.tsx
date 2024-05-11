import { useLocation } from "react-router-dom"
import CategoriesSidebar from "../../components/CategoriesSidebar/CategoriesSidebar"
import Product from "../../components/Product/Product"
import './Categories.scss'
import { renderProducts } from "../../Utils"
const Categories = () => {
  const {pathname} = useLocation()
  const [_, collectionName, categoryType] = pathname.split("/");
  console.log(collectionName);
  const products: Product[] = renderProducts(`https://dummyjson.com/products/category/${categoryType}`);
  console.log(products);
  return (
    <div className="categories">
      <CategoriesSidebar products={products}/>
      <div className="categories_content">
        {products &&  products.length > 0  && products.map((product) => <Product key={product.id} {...product} />)}
        </div>
    </div>

  )
}

export default Categories
