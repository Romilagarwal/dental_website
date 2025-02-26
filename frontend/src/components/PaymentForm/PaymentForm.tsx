import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCreditCard, FiSmartphone, FiGlobe, FiChevronRight, FiCheck, FiX, FiLock } from 'react-icons/fi';
import './PaymentForm.scss';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

// Payment method types
type PaymentMethodType = 'card' | 'upi' | 'netbanking';

interface PaymentMethodOption {
  id: PaymentMethodType;
  label: string;
  icon: React.ReactNode;
}

const paymentMethods: PaymentMethodOption[] = [
  { id: 'card', label: 'Credit/Debit Card', icon: <FiCreditCard /> },
  { id: 'upi', label: 'UPI', icon: <FiSmartphone /> },
  { id: 'netbanking', label: 'Net Banking', icon: <FiGlobe /> }
];

// Bank options for net banking
interface BankOption {
  id: string;
  name: string;
  logo: string;
}

const bankOptions: BankOption[] = [
  { id: 'hdfc', name: 'HDFC Bank', logo: '/banks/hdfc.png' },
  { id: 'sbi', name: 'State Bank of India', logo: '/banks/sbi.png' },
  { id: 'icici', name: 'ICICI Bank', logo: '/banks/icici.png' },
  { id: 'axis', name: 'Axis Bank', logo: '/banks/axis.png' },
  { id: 'kotak', name: 'Kotak Mahindra Bank', logo: '/banks/kotak.png' },
];

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSuccess, onCancel }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('card');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [upiId, setUpiId] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  const stripe = useStripe();
  const elements = useElements();

  const handleCardPayment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        return;
      }

      // Here you would send the payment method to your server
      // For this example, we'll simulate success
      setTimeout(() => {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }, 1000);
    } catch (err) {
      setError('Payment processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleUPIPayment = (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    // Validate UPI ID
    const upiPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
    if (!upiPattern.test(upiId)) {
      setError('Please enter a valid UPI ID');
      setProcessing(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
      setProcessing(false);
    }, 1500);
  };

  const handleNetBankingPayment = (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!selectedBank) {
      setError('Please select a bank');
      setProcessing(false);
      return;
    }

    // Simulate redirect to bank
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="payment-form-container">
      <div className="payment-methods">
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            className={`payment-method-option ${selectedMethod === method.id ? 'selected' : ''}`}
            onClick={() => setSelectedMethod(method.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="method-icon">{method.icon}</div>
            <div className="method-label">{method.label}</div>
            {selectedMethod === method.id && (
              <div className="method-check">
                <FiCheck />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            className="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="success-icon">
              <FiCheck />
            </div>
            <h3>Payment Successful!</h3>
            <p>Your payment of ₹{amount} has been processed successfully.</p>
          </motion.div>
        ) : (
          <motion.div
            key={selectedMethod}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {selectedMethod === 'card' && (
              <form onSubmit={handleCardPayment}>
                <div className="card-element-container">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#424770',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#9e2146',
                        },
                      },
                    }}
                  />
                </div>
                {error && <div className="error-message">{error}</div>}
                <motion.button
                  type="submit"
                  disabled={!stripe || processing}
                  className="submit-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {processing ? 'Processing...' : `Pay ₹${amount}`}
                </motion.button>
              </form>
            )}

            {selectedMethod === 'upi' && (
              <form onSubmit={handleUPIPayment} className="upi-form">
                <div className="form-group">
                  <label htmlFor="upi-id">Enter your UPI ID</label>
                  <input
                    type="text"
                    id="upi-id"
                    placeholder="username@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="upi-input"
                  />
                  <small>Example: username@okicici, username@okhdfc, etc.</small>
                </div>
                {error && <div className="error-message">{error}</div>}
                <motion.button
                  type="submit"
                  disabled={processing || !upiId}
                  className="submit-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {processing ? 'Processing...' : `Pay ₹${amount} with UPI`}
                </motion.button>
              </form>
            )}

            {selectedMethod === 'netbanking' && (
              <form onSubmit={handleNetBankingPayment} className="netbanking-form">
                <div className="form-group">
                  <label>Select your bank</label>
                  <div className="bank-options">
                    {bankOptions.map((bank) => (
                      <motion.div
                        key={bank.id}
                        className={`bank-option ${selectedBank === bank.id ? 'selected' : ''}`}
                        onClick={() => setSelectedBank(bank.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="bank-logo">
                          <img src={bank.logo} alt={bank.name} />
                        </div>
                        <div className="bank-name">{bank.name}</div>
                        {selectedBank === bank.id && (
                          <div className="bank-check">
                            <FiCheck />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <motion.button
                  type="submit"
                  disabled={processing || !selectedBank}
                  className="submit-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {processing
                    ? 'Redirecting to bank...'
                    : `Pay ₹${amount} with Net Banking`}
                </motion.button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!success && (
        <div className="payment-footer">
          <button
            onClick={onCancel}
            className="cancel-button"
            disabled={processing}
          >
            Cancel
          </button>
          <div className="secure-notice">
            <FiLock />
            <span>Secured with AES-256 encryption</span>
          </div>
        </div>
      )}
    </div>
  );
};

const PaymentWrapper: React.FC<{
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}> = ({ amount, onSuccess, onCancel }) => (
  <Elements stripe={stripePromise}>
    <PaymentForm amount={amount} onSuccess={onSuccess} onCancel={onCancel} />
  </Elements>
);

export default PaymentWrapper; 