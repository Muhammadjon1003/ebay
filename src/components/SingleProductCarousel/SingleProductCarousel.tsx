import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Product } from '../../types/Product';
import './SingleProductCarousel.scss'

const SingleProductCarousel = (product: Product) => {
  return (
    <div className='single_product-carousel'>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {product.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`${product.title} - Image ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SingleProductCarousel
