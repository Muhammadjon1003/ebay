import { Link } from "react-router-dom";
import { useFetchData } from "../../Utils"

const CategoryModule = ({isClicked, setisClicked}: {isClicked: boolean, setisClicked: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const categories: object[] = useFetchData('https://dummyjson.com/products/categories')
  return (
  <ul className={`category_module ${isClicked ? 'category_module-active' : ''}`}>
      {
        isClicked && categories && categories.map((category, index) => <li key={index} onClick={() => setisClicked(false)}><Link to={`/category/${category.name}`}>{category.name}</Link></li>)
    }
  </ul>
  )
}

export default CategoryModule
