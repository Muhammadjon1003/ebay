import { useLocation } from "react-router-dom"
import CategoriesSidebar from "../../components/CategoriesSidebar/CategoriesSidebar"
import ProductComponent from "../../components/Product/Product"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import './Categories.scss'
import { useFetchData } from "../../Utils"
import type { Product } from "../../types/Product"

const Categories = () => {
  const {pathname} = useLocation()
  const [_, collectionName, categorySlug] = pathname.split("/");
  
  const response = useFetchData(`https://dummyjson.com/products/category/${categorySlug}`);
  const products: Product[] = response?.products || [];
  const isLoading = !response;
  
  return (
    <div className="categories">
      <CategoriesSidebar products={products}/>
      <div className="categories_content">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          products && products.length > 0 ? (
            products.map((product) => (
              <ProductComponent key={product.id} {...product} />
            ))
          ) : (
            <div className="no-products">
              <h2>No products found</h2>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Categories
