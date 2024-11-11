import Carousel from "../components/Carousel/Carousel"
import HeroCategories from "../components/HeroCategories/HeroCategories"
import { Product } from "../types/Product"
import { renderProducts } from "../Utils"
import ProductComponent from "../components/Product/Product"

const Home = () => {
  const products: Product[] = renderProducts('https://dummyjson.com/products?limit=200')
  return (
    <div>
      <Carousel />
      <HeroCategories />
      <div className="products">
        {products && products.length > 0 && products.map((product) => (
          <ProductComponent key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

export default Home
