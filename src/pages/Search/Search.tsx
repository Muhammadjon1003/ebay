import { useLocation } from "react-router-dom";
import { renderProducts } from "../../Utils";
import CategoriesSidebar from "../../components/CategoriesSidebar/CategoriesSidebar"
import Product from "../../components/Product/Product";
import '../Categories/Categories.scss'
const Search = () => {
  const products: Product[] = renderProducts('https://dummyjson.com/products?limit=200')

  const {pathname} = useLocation();
  const [_, productpathname, search, inputValue] = pathname.split("/");
  console.log(productpathname,search, inputValue);
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().startsWith(inputValue.toLowerCase())
  );
 
  return (
    <div className="categories">
      <CategoriesSidebar products={products}/>
      <div className="categories_content">
        {products &&  products.length > 0  && filteredProducts.map((product) => <Product key={product.id} {...product} />)}
        </div>
    </div>
  )
}

export default Search
