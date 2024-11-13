import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Product } from '../../types/Product';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './SingleProductCarousel.scss'
import { useState } from 'react';

const SingleProductCarousel = (product: Product) => {
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(product.images.length).fill(false));
  const [currentImageLoading, setCurrentImageLoading] = useState(true);

  const handleImageLoad = (index: number) => {
    const newLoadedState = [...imagesLoaded];
    newLoadedState[index] = true;
    setImagesLoaded(newLoadedState);
    setCurrentImageLoading(false);
  };

  return (
    <div className='single_product-carousel'>
      <Swiper
        cssMode={false}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
        initialSlide={0}
      >
        {product.images.map((image, index) => (
          <SwiperSlide key={index}>
            {currentImageLoading && !imagesLoaded[index] && <LoadingSpinner />}
            {imagesLoaded[index] && (
              <img 
                src={image} 
                alt={`${product.title} - Image ${index + 1}`}
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
                className={`carousel-image ${imagesLoaded[index] ? 'loaded' : ''}`}
                style={{ display: imagesLoaded[index] ? 'block' : 'none' }}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SingleProductCarousel
