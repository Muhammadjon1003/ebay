import './Herobanner.scss'
import { carouselData } from '../Carousel/Carousel';
const HeroBanner = () => {
  const randomIndex = Math.floor(Math.random() * carouselData.length);
  const selectedComponent = carouselData[randomIndex];
  const { title, description, button_title, componentClass } = selectedComponent;
  return (
    <div className={`hero__banner-component ${componentClass}`}>
    <div className="hero_black_banner"></div>
    <div className="hero__component-content">
       <h2>{title}</h2>
       <p>{description}</p>
    </div>
    <div className="hero__component-button">
    <button>{button_title}</button>
    </div>
    </div>
  )
}

export default HeroBanner;

