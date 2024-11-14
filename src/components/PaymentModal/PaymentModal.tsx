import { useState } from 'react';
import './PaymentModal.scss';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onPaymentComplete: () => void;
}

const PaymentModal = ({ isOpen, onClose, totalAmount, onPaymentComplete }: PaymentModalProps) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally process the payment
    onPaymentComplete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Payment Details</h2>
        <p className="total-amount">Total Amount: ${totalAmount.toFixed(2)}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Card Holder Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
              placeholder="1234 5678 9012 3456"
              required
              maxLength={16}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="MM/YY"
                required
                maxLength={4}
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                placeholder="123"
                required
                maxLength={3}
              />
            </div>
          </div>
          <button type="submit" className="pay-button">
            Pay ${totalAmount.toFixed(2)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal; 