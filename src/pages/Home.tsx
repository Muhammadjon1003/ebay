import Carousel from "../components/Carousel/Carousel"
import HeroCategories from "../components/HeroCategories/HeroCategories"
import { Product } from "../types/Product"
import { useFetchData } from "../Utils"
import HeroBanner from "../components/HeroBanner/HeroBanner"
import FeaturedBox from "../components/FeaturedBox/FeaturedBox"
import './Home.scss'
import ebayLogo from '../assets/logo.svg'

const Home = () => {
  const response = useFetchData('https://dummyjson.com/products?limit=200');
  const allProducts: Product[] = response?.products || [];

  // Create sections with sorted products
  const sections = [
    {
      title: "What's on Mom's list?",
      products: [...allProducts].slice(0, 6)
    },
    {
      title: "Top Deals",
      products: [...allProducts]
        .sort((a, b) => b.discountPercentage - a.discountPercentage)
        .slice(0, 6)
    },
    {
      title: "Best Sellers",
      products: [...allProducts]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6)
    }
  ];

  return (
    <div className="home-sections">
      <Carousel />
      <HeroBanner variant="first" />
      <FeaturedBox 
        ebay_logo={ebayLogo}
        title="Featured Box Title"
        description="This is a featured box description that highlights special offers or promotions"
        button_title="Shop Now"
        box_image="https://i.ebayimg.com/thumbs/images/g/mZUAAOSwqNxd8tsT/s-l640.webp"
      />
      <HeroCategories 
        title={sections[0].title}
        products={sections[0].products}
      />
      <HeroBanner variant="second" />
      <HeroCategories 
        title={sections[1].title}
        products={sections[1].products}
      />
      <FeaturedBox 
        ebay_logo={ebayLogo}
        title="Special Offers"
        description="Discover amazing deals and exclusive discounts on top brands"
        button_title="View Deals"
        box_image="https://i.ebayimg.com/thumbs/images/g/N50AAOSwaShd8trY/s-l640.webp"
      />
      <HeroCategories 
        title={sections[2].title}
        products={sections[2].products}
      />
    </div>
  )
}

export default Home
