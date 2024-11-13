import { useLocation } from "react-router-dom";
import { useFetchData } from "../../Utils";
import CategoriesSidebar from "../../components/CategoriesSidebar/CategoriesSidebar"
import Product from "../../components/Product/Product";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Product as ProductType } from "../../types/Product";
import '../Categories/Categories.scss'

const Search = () => {
  const response = useFetchData('https://dummyjson.com/products?limit=200');
  const products: ProductType[] = response?.products || [];
  const isLoading = !response;
  const {pathname} = useLocation();
  const [_, productpathname, search, inputValue] = pathname.split("/");
  
  const filteredProducts = products.filter((product: ProductType) =>
    product.title.toLowerCase().startsWith(inputValue.toLowerCase())
  );
 
  return (
    <div className="categories">
      <CategoriesSidebar products={products}/>
      <div className="categories_content">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          filteredProducts.length > 0 ? (
            filteredProducts.map((product: ProductType) => (
              <Product key={product.id} {...product} />
            ))
          ) : (
            <div className="no-products">
              <h2>No products found for "{inputValue}"</h2>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Search
