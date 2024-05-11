import { Link } from "react-router-dom";
import { renderProducts } from "../../Utils"

const SearchModule = ({inputValue, setInputValue}: {inputValue: string, setInputValue: React.Dispatch<React.SetStateAction<string>>}) => {
    const products: Product[] = renderProducts('https://dummyjson.com/products?limit=200')

  
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().startsWith(inputValue.toLowerCase())
    );
  return (
  <ul className={`search_module ${inputValue ? 'search_module-active' : ''}`}>
      {
        inputValue && filteredProducts.map((product, index) => <li key={index} onClick={() => setInputValue('')}><Link to={`/products/${product.id}`}>{product.title}</Link></li>)
    }
  </ul>
  )
}

export default SearchModule
