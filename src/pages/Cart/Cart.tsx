import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import CartItem from "../../components/CartItem/CartItem";
import { removeFromCart, updateCartItemAmount, clearCart } from "../../redux/slice/cartSlice";
import './Cart.scss';
import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import PaymentModal from '../../components/PaymentModal/PaymentModal';
import { useNavigate } from 'react-router-dom';

interface CartProduct extends Product {
  amount: number;
}

const Cart = () => {
  const dispatch = useDispatch();
  const cartStorage = useSelector((state: RootState) => state.cart.cartStorage) as CartProduct[];
  const [subtotal, setSubtotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateAmount = (productId: number, newAmount: number) => {
    dispatch(updateCartItemAmount({ id: productId, amount: newAmount }));
  };

  // Update totals whenever cart changes
  useEffect(() => {
    const newSubtotal = cartStorage.reduce((total, item) => {
      return total + (item.price * item.amount);
    }, 0);
    
    const newTotalItems = cartStorage.reduce((total, item) => {
      return total + item.amount;
    }, 0);

    setSubtotal(newSubtotal);
    setTotalItems(newTotalItems);
    console.log(cartStorage);
    
  }, [cartStorage]);

  const deliveryFee = subtotal * 0.1;

  const handlePaymentComplete = () => {
    dispatch(clearCart());
    alert('Payment successful! Thank you for your purchase.');
    navigate('/');
  };

  return (
    <div className="basketDiv">
      <h1 className="main_navbar">Shopping cart</h1>
      {cartStorage && cartStorage.length > 0 ? (
        <>
          <div className="cart_products">
            {cartStorage.map((item) => (
              <CartItem 
                key={item.id} 
                {...item} 
                amount={item.amount}
                onRemove={() => handleRemoveFromCart(item.id)}
                onUpdateAmount={(newAmount) => handleUpdateAmount(item.id, newAmount)}
              />
            ))}
          </div>
          <div className="total_price">
            <div className="current_price">
              <p>Subtotal:</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="current_price">
              <p>Delivery Fee:</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            <div className="current_price">
              <p>Items ({totalItems})</p>
              <div className="products_total_price">
                <p className="last_price">
                  ${(subtotal + deliveryFee).toFixed(2)}
                </p>
              </div>
            </div>
            <button 
              className="paying_button" 
              onClick={() => setIsPaymentModalOpen(true)}
            >
              Go to checkout
            </button>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart to see them here!</p>
        </div>
      )}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totalAmount={subtotal + deliveryFee}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
};

export default Cart;
