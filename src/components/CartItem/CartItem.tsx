import { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import { useDispatch } from 'react-redux';
import { updateCartItemAmount } from '../../redux/slice/cartSlice';
import './CartItem.scss';

// Create a type that extends Product and adds onRemove
interface CartItemProps extends Omit<Product, 'tags'> {
  onRemove: () => void;
  amount: number;
  onUpdateAmount: (newAmount: number) => void;
}

const CartItem = ({ 
  id,
  title, 
  price, 
  thumbnail, 
  brand, 
  onRemove,
  discountPercentage,
  stock,
  shippingInformation,
  amount,
  onUpdateAmount
}: CartItemProps) => {
  const [quantity, setQuantity] = useState(amount);
  const [totalPrice, setTotalPrice] = useState(price * amount);
  const [showStockMessage, setShowStockMessage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTotalPrice(price * quantity);
  }, [price, quantity]);

  const handleIncrease = () => {
    if (quantity < stock) {
      const newAmount = quantity + 1;
      setQuantity(newAmount);
      dispatch(updateCartItemAmount({ id, amount: newAmount }));
      onUpdateAmount(newAmount);
    } else {
      setShowStockMessage(true);
      setTimeout(() => setShowStockMessage(false), 3000); // Hide after 3 seconds
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newAmount = quantity - 1;
      setQuantity(newAmount);
      dispatch(updateCartItemAmount({ id, amount: newAmount }));
      onUpdateAmount(newAmount);
    }
  };

  return (
    <div className="cart_product">
      <img src={thumbnail} alt={title} />
      <div className="cart_product_info">
        <div className="cart_product_header">
          <div className="cart_product_details">
            <div className="cart_brand">
              <span>{brand}</span>
            </div>
            <div className="cart_product_title">
              <p>{title}</p>
            </div>
          </div>
          <div className="cart_product_price">
            <div className="product_price_count">
              <div className="count">
                <button onClick={handleDecrease}>-</button>
                <span className="quantity">{quantity}</span>
                <button onClick={handleIncrease}>+</button>
              </div>
              {showStockMessage && (
                <div className="stock-message">
                  Only {stock} items available
                </div>
              )}
            </div>
            <div className="cart__product_price_x">
              <p className="product_price1">${totalPrice.toFixed(2)}</p>
              {discountPercentage > 0 && (
                <p className="product_price2">
                  ${(totalPrice * (1 + discountPercentage / 100)).toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
        {stock && <p className="product_stock">{stock} in stock</p>}
        {shippingInformation && <p className="product_shipping">{shippingInformation}</p>}
      </div>
      <button className="cart_product_remove" onClick={onRemove}>Remove</button>
    </div>
  );
};

export default CartItem; 