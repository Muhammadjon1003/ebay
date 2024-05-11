import { useLocation } from "react-router-dom"
import { saveToLocalStorage, useFetchData } from "../../Utils";
import SingleProductCarousel from "../../components/SingleProductCarousel/SingleProductCarousel";
import './SingleProduct.scss'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { addToCart } from "../../redux/slice/cartSlice";
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
    console.log(cartStorage);
  return (
    <div className="single_product">
         <h1>EXTRA <span className="red">$10</span> OFF 3+ ITEMS WITH CODE <span className="red">10OFF2023TECH</span></h1>
    {
      product && <SingleProductCarousel {...product} />
    }
    <div className="single_product-info">
      <h2>{product?.title}</h2>
      <hr />
      <p> Description:{product?.description}</p>
      <p>Rating: <span>{product?.rating}/5</span></p>
      <p>Brand: <span>{product?.brand}</span></p>
      <p>Category: <span>{product?.category}</span></p>
      <p>Quantity: <span>{product?.stock}</span></p>
      <hr />
      <div className="single_product-price">
       <p>Price: <h3>${product?.price}</h3></p>
       <div className="single_product-buttons">
         <button className="buy_now">Buy Now</button>
         <button className="add_to_cart" onClick={handleAddToCart}>Add to Cart</button>
         <button className="add_to_wishlist">Add to Wishlist</button>
       </div>
      </div>
    </div>
    </div>
  )
}

export default SingleProduct
