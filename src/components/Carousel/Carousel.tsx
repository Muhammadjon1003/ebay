// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { MdPause } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './Carousel.scss';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import CarouselComponent from './CarouselComponent';
import { useState } from 'react';
export const carouselData = [
  {
    title: "A true-blue '80s classic",
    description: "Don't miss the return of the iconic AJ4 'Military Blue.",
    button_title: "Shop Now",
    imageUrls: [
      "https://i.ebayimg.com/images/g/wRQAAOSwG-5mKWvS/s-l960.webp"
    ],
    componentClass: "component1"
  },
  {
    title: "15% off a spring refresh",
    description: "Save on select tech, fashion, home, and more.",
    button_title: "Get the coupon",
    imageUrls: [
      "https://i.ebayimg.com/images/g/1mQAAOSwropmIxmj/s-l960.webp"
    ],
    componentClass: "component2"
  },
  {
    title: "Up to 60% off at The Brand Outlet",
    description: "Save on everything you need from brands you love.",
    button_title: "Shop Now",
    imageUrls: [
      "https://i.ebayimg.com/images/g/E70AAOSwm6VmBeZD/s-l300.webp",
      "https://i.ebayimg.com/images/g/-P8AAOSwotFmBeZF/s-l300.webp",
      "https://i.ebayimg.com/images/g/SMgAAOSwWbtmBeZH/s-l300.webp"
    ],
    componentClass: "component3"
  },
  {
    title: "No fakes. No fraud. No doubt.",
    description: "Expand your collection confidently with Authenticity Guarantee.",
    button_title: "Learn More",
    imageUrls: [],
    componentClass: "component4"
  }
];


export default function Carousel() {
    const [enabledAutoplay, setEnabledAutoplay] = useState(true);
    const handleAutoplayChange = () => {
        setEnabledAutoplay(!enabledAutoplay);
    }
    console.log(enabledAutoplay);
  return (
    <div className='carousel_wrapper'>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        loop={true}
        autoplay={ enabledAutoplay ? {
            delay: 4000,
        } : {
            delay: 30000,
        }}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
      >
        <div className="pause_button" onClick={handleAutoplayChange}>
        {enabledAutoplay ? <MdPause size={40} /> : <FaPlay size={30}/>}
        </div>
        {
          carouselData.map((data, index) => (
            <SwiperSlide key={index}>
        <CarouselComponent
        title={data.title}
        description={data.description}
        button_title={data.button_title}
        imageUrls={data.imageUrls}
        componentClass={data.componentClass}
      />
        </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}
