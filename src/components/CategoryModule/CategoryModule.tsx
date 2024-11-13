import { Link } from "react-router-dom";
import { useFetchData } from "../../Utils"
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
    const rawCategories = useFetchData('https://dummyjson.com/products/categories');

    useEffect(() => {
      if (rawCategories) {
        const formattedCategories = rawCategories.map((category: string) => ({ 
          name: category 
        }));
        setCategories(formattedCategories);
      }
    }, [rawCategories]);

    return (
      <ul className={`category_module ${isClicked ? 'category_module-active' : ''}`}>
        {isClicked && categories && categories.map((category, index) => (
          <li key={index} onClick={() => setisClicked(false)}>
            <Link to={`/category/${category.name}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    );
};

export default CategoryModule;
