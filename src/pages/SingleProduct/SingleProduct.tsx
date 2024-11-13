import { useLocation, useNavigate } from "react-router-dom"
import { saveToLocalStorage, useFetchData } from "../../Utils";
import SingleProductCarousel from "../../components/SingleProductCarousel/SingleProductCarousel";
import './SingleProduct.scss'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { addToCart } from "../../redux/slice/cartSlice";
import { likeProduct, dislikeProduct } from "../../redux/slice/likeSlice";
import { IoMdStar } from "react-icons/io";
import { FaShippingFast, FaWarehouse } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { Product, Review } from "../../types/Product";

const SingleProduct = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [isInCart, setIsInCart] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [_,products, productId] = pathname.split("/");
    
    const data = useFetchData(`https://dummyjson.com/products/${productId}`);
    const cartStorage = useSelector((state: RootState) => state.cart.cartStorage);
    const likedProducts = useSelector((state: RootState) => state.like.likedProducts);
    
    useEffect(() => {
      if(data){
        setProduct(data)
      }
    }, [data])

    useEffect(() => {
      if (product) {
        setIsInCart(cartStorage.some(item => item.id === product.id));
        setIsInWishlist(likedProducts.some(item => item.id === product.id));
      }
    }, [product, cartStorage, likedProducts]);

    const handleBuyNow = () => {
      if (product) {
        dispatch(addToCart({ ...product, amount: 1 }));
        navigate('/cart');
      }
    };

    const handleAddToCart = () => {
      if (product) {
        dispatch(addToCart({ ...product, amount: 1 }));
      }
    };

    const handleWishlist = () => {
      if (product) {
        if (isInWishlist) {
          dispatch(dislikeProduct(product));
        } else {
          dispatch(likeProduct(product));
        }
      }
    };

    useEffect(() => {
      saveToLocalStorage("cartStorage", cartStorage)
    },[cartStorage])

    // Calculate average rating from reviews
    const averageReviewRating = product?.reviews?.length 
      ? (product.reviews.reduce((acc: number, review: Review) => acc + review.rating, 0) / product.reviews.length).toFixed(1)
      : product?.rating;

    return (
      <>
        <div className="single_product">
          <h1>EXTRA <span className="red">$10</span> OFF 3+ ITEMS WITH CODE <span className="red">10OFF2023TECH</span></h1>
          {product && <SingleProductCarousel {...product} />}
          <div className="single_product-info">
            <div className="product_header">
              <h2>{product?.title}</h2>
              <span className="product_brand">by {product?.brand}</span>
              <span className="product_sku">SKU: {product?.sku}</span>
            </div>
            <hr />
            
            <div className="product_rating">
              {[...Array(5)].map((_, index) => (
                <IoMdStar 
                  key={index}
                  size={25}
                  style={{ color: index < Math.round(Number(averageReviewRating)) ? '#ffd700' : '#ddd' }}
                />
              ))}
              <p>({averageReviewRating}) · {product?.reviews?.length || 0} reviews</p>
            </div>

            <div className="product_details">
              <p className="description">Description: {product?.description}</p>
              <p className="category">Category: <span>{product?.category}</span></p>
              <p className="stock">
                <FaWarehouse /> {product?.stock} in stock
                <span className={`status_indicator ${product?.availabilityStatus?.toLowerCase().replace(' ', '_')}`}>
                  {product?.availabilityStatus}
                </span>
              </p>
              <p className="shipping">
                <FaShippingFast /> {product?.shippingInformation}
              </p>
              <p className="warranty">
                <MdSecurity /> {product?.warrantyInformation}
              </p>
              {product?.minimumOrderQuantity && product.minimumOrderQuantity > 1 && (
                <p className="moq">Minimum order: {product.minimumOrderQuantity} units</p>
              )}
              <p className="return_policy">{product?.returnPolicy}</p>
            </div>
            <hr />

            <div className="product_dimensions">
              <h3>Product Dimensions</h3>
              <p>Width: {product?.dimensions?.width}cm</p>
              <p>Height: {product?.dimensions?.height}cm</p>
              <p>Depth: {product?.dimensions?.depth}cm</p>
              <p>Weight: {product?.weight}kg</p>
            </div>
            <hr />

            <div className="single_product-price">
              <div className="price_info">
                <div className="price-display">
                  <span>Price:</span>
                  <h3>${product?.price}</h3>
                </div>
                {product?.discountPercentage && product.discountPercentage > 0 && (
                  <span className="discount">-{Math.round(product.discountPercentage)}% OFF</span>
                )}
              </div>
              <div className="single_product-buttons">
                <button className="buy_now" onClick={handleBuyNow}>
                  Buy Now
                </button>
                <button 
                  className={`add_to_cart ${isInCart ? 'added' : ''}`} 
                  onClick={handleAddToCart}
                  disabled={isInCart}
                >
                  {isInCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <button 
                  className={`add_to_wishlist ${isInWishlist ? 'added' : ''}`}
                  onClick={handleWishlist}
                >
                  {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {product?.reviews && product.reviews.length > 0 && (
          <div className="product_reviews_container">
            <div className="product_reviews">
              <h3>Customer Reviews</h3>
              <div className="reviews_grid">
                {product.reviews.map((review, index) => (
                  <div key={index} className="review">
                    <div className="review_header">
                      <p className="reviewer">{review.reviewerName}</p>
                      <div className="review_rating">
                        {[...Array(5)].map((_, i) => (
                          <IoMdStar 
                            key={i}
                            size={15}
                            style={{ color: i < review.rating ? '#ffd700' : '#ddd' }}
                          />
                        ))}
                      </div>
                      <span className="review_date">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="review_comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    )
}

export default SingleProduct
