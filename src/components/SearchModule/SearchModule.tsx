import { Link } from "react-router-dom";
import { useFetchData } from "../../Utils";
import { Product } from "../../types/Product";

const SearchModule = ({
  inputValue, 
  setInputValue
}: {
  inputValue: string, 
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}) => {
  const response = useFetchData('https://dummyjson.com/products?limit=200');
  const products: Product[] = response?.products || [];

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(inputValue.toLowerCase()) ||
    (product.tags && product.tags.some(tag => tag.toLowerCase().includes(inputValue.toLowerCase())))
  ).slice(0, 10); // Limit the number of search results

  return (
    <ul className={`search_module ${inputValue ? 'search_module-active' : ''}`}>
      {inputValue && filteredProducts.map((product) => (
        <li key={product.id} onClick={() => setInputValue('')}>
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default SearchModule
