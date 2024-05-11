import  { CSSProperties, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './SingleProductCarousel.scss';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
const style: CSSProperties = {
    '--swiper-navigation-color': '#3665F3',
    '--swiper-pagination-color': '#fff',
} as CSSProperties;
export default function SingleProductCarousel(product:Product | undefined) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className='single_product-carousel'>
      <Swiper
        onSwiper={setThumbsSwiper}
        direction='vertical'
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
       { product && product.images && product?.images.map((image, index) => <SwiperSlide key={index}><img src={image} /></SwiperSlide>)}
      </Swiper>
      <Swiper
      style={style}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
      { product && product.images && product?.images.map((image, index) => <SwiperSlide key={index}><img src={image} /></SwiperSlide>)}
      </Swiper>
    </div>
  );
}
