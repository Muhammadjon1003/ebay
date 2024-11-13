import { Link } from "react-router-dom";
import './HeroCategories.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import { Navigation, Grid } from 'swiper/modules';
import { Product } from "../../types/Product";

interface HeroCategoriesProps {
  title: string;
  products: Product[];
}

const HeroCategories = ({ title, products }: HeroCategoriesProps) => {
  return (
    <div>
      <div className="hero__categories">
        <div className="hero__categories-navbar">
          <h1>{title}</h1>
          <p>See all</p>
        </div>
        <div className="hero__categories-wrapper">
          <Swiper
            slidesPerView={6}
            grid={{
              rows: 2,
              fill: 'row'
            }}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation, Grid]}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 15
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 30
              },
            }}
            className="hero-swiper"
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <Link to={`/products/${product.id}`} className="hero__category">
                  <div className="hero__category-image">
                    <img src={product.thumbnail} alt={product.title} />
                  </div>
                  <h3>{product.title}</h3>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HeroCategories;
