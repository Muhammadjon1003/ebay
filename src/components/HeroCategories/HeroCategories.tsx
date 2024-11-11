import { handleSelectedCategories, saveToLocalStorage } from "../../Utils";
import { Link } from "react-router-dom";
import './HeroCategories.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Grid } from 'swiper/modules';
import { Product } from "../../types/Product";

const HeroCategories = () => {
  const selectedCategories: Product[] = handleSelectedCategories("https://dummyjson.com/products?limit=200", 12);
  console.log(selectedCategories);
  saveToLocalStorage('basket', selectedCategories)

  return (
    <div>
      <div className="hero__categories">
        <div className="hero__categories-navbar">
          <h1>What's on Mom's list?</h1>
          <p>See all</p>
        </div>
        <Swiper
          slidesPerView={6}
          grid={{
            rows: 2,
          }}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation, Pagination, Grid]}
          breakpoints={{
            320: {
              slidesPerView: 2,
              grid: {
                rows: 2
              }
            },
            640: {
              slidesPerView: 3,
              grid: {
                rows: 2
              }
            },
            768: {
              slidesPerView: 4,
              grid: {
                rows: 2
              }
            },
            1024: {
              slidesPerView: 6,
              grid: {
                rows: 2
              }
            },
          }}
          className="hero-swiper"
        >
          {selectedCategories.map((category, index) => (
            <SwiperSlide key={index}>
              <Link to={`/products/${category.id}`} className="hero__category">
                <div className="hero__category-image">
                  <img src={category.thumbnail} alt={category.title} />
                </div>
                <h3>{category.title}</h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroCategories;
