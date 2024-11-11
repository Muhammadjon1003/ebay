import { useLocation } from "react-router-dom"
import CategoriesSidebar from "../../components/CategoriesSidebar/CategoriesSidebar"
import ProductComponent from "../../components/Product/Product"
import './Categories.scss'
import { renderProducts } from "../../Utils"
import type { Product as ProductType } from "../../types/Product"

const Categories = () => {
  const {pathname} = useLocation()
  const [_, collectionName, categoryType] = pathname.split("/");
  console.log(collectionName);
  const products: ProductType[] = renderProducts(`https://dummyjson.com/products/category/${categoryType}`);
  console.log('products',products);
  return (
    <div className="categories">
      <CategoriesSidebar products={products}/>
      <div className="categories_content">
        {products && products.length > 0 && products.map((product) => (
          <ProductComponent key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

export default Categories
