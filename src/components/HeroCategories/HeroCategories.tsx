import { handleSelectedCategories, saveToLocalStorage,} from "../../Utils";
import './HeroCategories.scss';
const HeroCategories = () => {

  const selectedCategories = handleSelectedCategories("https://dummyjson.com/products?limit=200", 6);
console.log(selectedCategories);
saveToLocalStorage('basket', selectedCategories)
  return (
    <div>
      <div className="hero__categories">
        <div className="hero__categories-navbar">
            <h1>What's on Mom's list?</h1>
            <p>See all</p>
        </div>
        {selectedCategories.map((category, index) => (
          <div key={index} className="hero__category">
            <div className="hero__category-image">
            <img src={category.thumbnail} alt="" />
            </div>
            <h3>{category.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroCategories;
