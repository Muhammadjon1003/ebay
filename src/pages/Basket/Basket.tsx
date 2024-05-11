import { useDispatch, useSelector } from "react-redux";
import { calculateOldPrice, saveToLocalStorage } from "../../Utils"
import "./Basket.scss"
import { FaMinus, FaPlus } from "react-icons/fa6";
import { RootState } from "../../redux/store/store";
import { decrementCount, incrementCount, removeFromCart } from "../../redux/slice/cartSlice";
import { useEffect } from "react";
const Basket = () => {
  const dispatch = useDispatch()
  const cartStorage = useSelector((state: RootState) => state.cart.cartStorage)
  useEffect(() => {
    saveToLocalStorage("cartStorage", cartStorage)
  }, [cartStorage])
  const totalPrice = cartStorage.reduce((total, product) => {
    const productPrice = product.amount ? product.price * product.amount : 0;
    return total + productPrice;
  }, 0);
  return (
    <main>
      <div className="basketDiv" >
        <div className="main_navbar">Shopping cart</div>
        <div className="cart_products">
          <div className="cat_products-navbar">
            {
              cartStorage.map(product => {
                const { id, title, price, thumbnail, category, brand, discountPercentage, amount } = product
                return (
                  <>
                    <div className="cart_product" key={id} >
                      <div className="cart_brand">
                        <h1>By {brand}</h1>
                        <p>request combined shipping</p>
                      </div>
                      <img src={thumbnail} alt="Product 3" />
                      <div className="cart_product_info">
                        <div className="cart_product_title">
                          <p>${title}</p>
                          <div className="count">
                            <button className="decrement-btn" onClick={() => dispatch(decrementCount(product))}><FaMinus size={20} /></button>
                            <span className="quantity">{amount}</span>
                            <button className="increment-btn" onClick={() => dispatch(incrementCount(product))}><FaPlus size={20} /></button>
                          </div>
                          <div className="cart__product_price_x">
                            <p><span className="product_price1">US ${price}</span></p>
                            <p><span className="product_price2">US ${calculateOldPrice(price, discountPercentage)}</span></p>
                          </div>
                        </div>
                        <div className="cart_product_price">
                          <p>Category: {category}</p>
                          <div className="product_price_count">
                            <div className="product_count">
                              <p>ebay international shipping</p>
                            </div>
                            <div className="product_count">
                              <p>+ US $52.75</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="cart_product_remove" onClick={() => dispatch(removeFromCart({ product }))}>Remove</button>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
        <hr />
        <div className="total_price">
          <div className="current_price">
            <p>Item ()</p>
            <p className="regular_price"> ${totalPrice}</p>
          </div>
          <div className="current_price">
            <p>Shipping fee</p>
            <p className="regular_price"> $52.75</p>
          </div>
          <hr />
          <div className="current_price">
            <p>Subtotal</p>
            <div className="products_total_price">
              <p className="last_price">${totalPrice + 52.75} </p>
            </div>
          </div>
          <button className="paying_button"> Go to checkout</button>
        </div>

      </div>
    </main>
  )
}

export default Basket
