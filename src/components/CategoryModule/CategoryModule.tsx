import { Link } from "react-router-dom";
import { useFetchCategories } from "../../Utils"
import { Category } from "../../types/Product";
import { useEffect, useState } from "react";

const CategoryModule = ({
  isClicked, 
  setisClicked
}: {
  isClicked: boolean, 
  setisClicked: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const rawCategories = useFetchCategories('https://dummyjson.com/products/categories', 20);
    
    useEffect(() => {
      if (Array.isArray(rawCategories)) {
        setCategories(rawCategories);
      }
    }, [rawCategories]);

    return (
      <div className={`category_module ${isClicked ? 'category_module-active' : ''}`}>
        <ul>
          {categories.map((category, index) => (
            <li key={index} onClick={() => setisClicked(false)}>
              <Link to={`/category/${category.slug}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default CategoryModule;
