import React from 'react';
import { FaChevronRight } from "react-icons/fa6";
import './CarouselComponent.scss'
interface CarouselProps {
  title: string;
  description: string;
  button_title: string;
  imageUrls?: string[];
  componentClass: string;
}

const CarouselComponent: React.FC<CarouselProps> = ({ title, description, button_title, imageUrls, componentClass }) => {
  return (
    <div className={`carousel__component ${componentClass}`}>
      <div className="component_black_banner"></div>
      <div className="carousel__component-content">
         <h2>{title}</h2>
         <p>{description}</p>
         <button>{button_title}</button>
      </div>
      {imageUrls && imageUrls.length === 3 && <CustomComponent images={imageUrls} />}
      {!(imageUrls && imageUrls.length === 3) && imageUrls && imageUrls.length > 0 && (
        <div className="carousel__component-images">
          {imageUrls.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Image ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

const CustomComponent = ({ images }: { images: string[] }) => {
  return (
         <div className="carousel__component-images2">
          <div className="img">
            <img src={images[0]} alt="" />
            <h3>EcoFlow <FaChevronRight/></h3>
          </div>
          <div className="img">
            <img src={images[1]} alt="" />
            <h3>TimberLand <FaChevronRight/></h3>
          </div>
          <div className="img">
            <img src={images[2]} alt="" />
            <h3>Samsonite <FaChevronRight/></h3>
          </div>
          </div>
  );
};

export default CarouselComponent;
