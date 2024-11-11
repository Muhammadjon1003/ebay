import { useLocation } from "react-router-dom"
import { saveToLocalStorage, useFetchData } from "../../Utils";
import SingleProductCarousel from "../../components/SingleProductCarousel/SingleProductCarousel";
import './SingleProduct.scss'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { addToCart } from "../../redux/slice/cartSlice";
import { IoMdStar } from "react-icons/io";
import { FaShippingFast, FaWarehouse } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { Product, Review } from "../../types/Product";

const SingleProduct = () => {
    const {pathname} = useLocation()
    const dispatch = useDispatch()
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [_,products, productId] = pathname.split("/");
    console.log(products, productId)
    const data = useFetchData(`https://dummyjson.com/products/${productId}`);
    
    useEffect(() => {
      if(data){
        setProduct(data)
      }
    }, [data])

    const handleAddToCart = () => {
      dispatch(addToCart({ ...product, amount:1}));
    };

    const cartStorage = useSelector((state: RootState) => state.cart.cartStorage)
    useEffect(() => {
      saveToLocalStorage("cartStorage", cartStorage)
    },[cartStorage])
    console.log(cartStorage)

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
                <p>Price: <h3>${product?.price}</h3></p>
                {product?.discountPercentage && product.discountPercentage > 0 && (
                  <span className="discount">-{Math.round(product.discountPercentage)}% OFF</span>
                )}
              </div>
              <div className="single_product-buttons">
                <button className="buy_now">Buy Now</button>
                <button className="add_to_cart" onClick={handleAddToCart}>Add to Cart</button>
                <button className="add_to_wishlist">Add to Wishlist</button>
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
