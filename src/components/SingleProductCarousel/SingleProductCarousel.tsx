import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Product } from '../../types/Product';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './SingleProductCarousel.scss'
import { useEffect, useState } from 'react';

const SingleProductCarousel = (product: Product) => {
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(product.images.length).fill(false));
  const [currentImageLoading, setCurrentImageLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedIndexes, setLoadedIndexes] = useState<number[]>([0]); // Start with first image

  const handleImageLoad = (index: number) => {
    const newLoadedState = [...imagesLoaded];
    newLoadedState[index] = true;
    setImagesLoaded(newLoadedState);
    setCurrentImageLoading(false);
  };

  // Load adjacent images when slide changes
  const handleSlideChange = (swiper: any) => {
    const newIndex = swiper.activeIndex % product.images.length;
    setActiveIndex(newIndex);
    setCurrentImageLoading(true);

    // Load current, previous, and next images if they haven't been loaded
    const indexesToLoad = [
      newIndex,
      (newIndex + 1) % product.images.length,
      (newIndex - 1 + product.images.length) % product.images.length
    ];

    setLoadedIndexes(prev => {
      const newIndexes = [...new Set([...prev, ...indexesToLoad])];
      return newIndexes;
    });
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
        onSlideChange={handleSlideChange}
        initialSlide={0}
      >
        {product.images.map((image, index) => (
          <SwiperSlide key={index}>
            {currentImageLoading && !imagesLoaded[index] && <LoadingSpinner />}
            {loadedIndexes.includes(index) && (
              <img 
                src={image} 
                alt={`${product.title} - Image ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
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
