import { Link } from "react-router-dom";
import { useFetchData } from "../../Utils";
import { Product } from "../../types/Product";

interface SearchModuleProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
}

const SearchModule = ({ 
  inputValue, 
  setInputValue, 
  selectedCategory 
}: SearchModuleProps) => {
  const response = useFetchData('https://dummyjson.com/products?limit=200');
  const products: Product[] = response?.products || [];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(inputValue.toLowerCase()) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(inputValue.toLowerCase())));
    
    if (selectedCategory === 'all') {
      return matchesSearch;
    }
    
    return matchesSearch && product.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
  }).slice(0, 10); // Limit to 10 results

  return (
    <ul className={`search_module ${inputValue ? 'search_module-active' : ''}`}>
      {inputValue && filteredProducts.map((product) => (
        <li key={product.id} onClick={() => setInputValue('')}>
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchModule;
