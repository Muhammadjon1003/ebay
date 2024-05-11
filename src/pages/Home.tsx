import Carousel from "../components/Carousel/Carousel"
import FeaturedBox from "../components/FeaturedBox/FeaturedBox"
import HeroBanner from "../components/HeroBanner/HeroBanner"
import HeroCategories from "../components/HeroCategories/HeroCategories"


const Home = () => {
  return (
    <div>
      <Carousel/>
      <HeroBanner/>
      <FeaturedBox
      ebay_logo="https://i.ebayimg.com/00/s/MTQzNFgxNjAw/z/ih4AAOSwPbdeAU5a/$_137.JPG"
      title= 'Deals made easy all year long.'
      description="Free shipping best prices"
      button_title="Get your thing"
      box_image="https://i.ebayimg.com/00/z/7SMAAOSwijBeAU5U/$_58.jpg"
      />
      <HeroCategories/>
    </div>
  )
}

export default Home
