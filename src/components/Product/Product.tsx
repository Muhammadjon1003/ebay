import { calculateOldPrice, isProductLiked, saveToLocalStorage } from "../../Utils"
import { IoMdStar } from "react-icons/io";
import { FaHeart  } from "react-icons/fa";
import { CiHeart  } from "react-icons/ci";
import './Product.scss'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dislikeProduct, likeProduct } from "../../redux/slice/likeSlice";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store/store";
import { Product as ProductType } from "../../types/Product";

const Product = (product: ProductType) => {
  const {
    id, 
    thumbnail, 
    title, 
    description, 
    price, 
    stock, 
    discountPercentage,
    rating,
    shippingInformation
  } = product;
  
  const [isliked, setIsliked] = useState(false)
  const dispatch = useDispatch()
  const LikedProducts = useSelector((state: RootState) => state.like.likedProducts)
  
  useEffect(() => {
    saveToLocalStorage('likedProducts', LikedProducts)
    setIsliked(isProductLiked(id, 'likedProducts'))
  },[LikedProducts])
  
  const handleLike = () => {
    dispatch(likeProduct(product));
  };
  
  const handleDislike = () => {
    dispatch(dislikeProduct(product));
  };
  
  return (
    <div className="product">
      <Link to={`/products/${id}`}>
        <div className="product_image">
          <img src={thumbnail} alt={title} />
        </div>
        <div className="product_info">
          <h1>{title}</h1>
          <p className="product_description">{description}</p>
          <div className="product_rating">
            {[...Array(5)].map((_, index) => (
              <IoMdStar 
                key={index}
                size={20}
                style={{ color: index < Math.round(rating) ? '#ffd700' : '#ddd' }}
              />
            ))}
            <p>({rating})</p>
          </div>
          <p className="product_price">${price}</p>
          <p className="product_old_price">Was: ${calculateOldPrice(price, discountPercentage)}</p>
          <p className="product_stock">{stock} in stock</p>
          {shippingInformation && <p className="product_shipping">{shippingInformation}</p>}
        </div>
      </Link>
      <button 
        className="product_like_button" 
        onClick={() => {isliked ? handleDislike() : handleLike()}} 
        data-isliked={isliked}
      >
        {isliked ? <FaHeart size={30}/> : <CiHeart size={30}/>}
      </button>
    </div>
  )
}

export default Product
