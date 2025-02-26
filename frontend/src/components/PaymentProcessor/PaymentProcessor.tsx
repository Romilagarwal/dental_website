import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCreditCard, FiCheckCircle, FiCopy, FiDownload, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import QRCode from 'qrcode.react';
import './PaymentProcessor.scss';

interface PaymentDetails {
  paymentId: string;
  reference: string;
  amount: number;
  upiId: string;
  upiName: string;
  upiLink: string;
  qrCodeUrl: string;
  note: string;
}

interface PaymentProcessorProps {
  appointmentId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({ appointmentId, onSuccess, onCancel }) => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>('');
  const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false);

  useEffect(() => {
    const generatePayment = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`/api/payments/generate/${appointmentId}`);
        setPaymentDetails(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to generate payment details. Please try again.');
        setLoading(false);
      }
    };

    generatePayment();
  }, [appointmentId]);

  const copyUpiId = () => {
    if (paymentDetails) {
      navigator.clipboard.writeText(paymentDetails.upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUpiPayment = () => {
    if (paymentDetails) {
      window.location.href = paymentDetails.upiLink;
    }
  };

  const verifyPayment = async () => {
    if (!transactionId.trim()) {
      setError('Please enter the transaction ID/reference number');
      return;
    }

    try {
      setVerifying(true);
      const response = await axios.post(`/api/payments/verify/${paymentDetails?.paymentId}`, {
        transactionId
      });
      
      setPaymentCompleted(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err) {
      setError('Payment verification failed. Please try again or contact support.');
      setVerifying(false);
    }
  };

  const downloadReceipt = () => {
    // In a real implementation, you would generate a PDF receipt here
    alert('Receipt download functionality would be implemented here');
  };

  if (loading) {
    return (
      <div className="payment-processor">
        <div className="payment-loading">
          <div className="spinner"></div>
          <p>Preparing payment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-processor">
        <div className="payment-error">
          <FiAlertCircle size={48} />
          <h3>Payment Error</h3>
          <p>{error}</p>
          <button onClick={onCancel} className="cancel-button">Go Back</button>
        </div>
      </div>
    );
  }

  if (paymentCompleted) {
    return (
      <div className="payment-processor">
        <div className="payment-success">
          <FiCheckCircle size={64} className="success-icon" />
          <h2>Payment Successful!</h2>
          <p>Your appointment has been confirmed.</p>
          <p>Reference: {paymentDetails?.reference}</p>
          <button onClick={downloadReceipt} className="download-receipt">
            <FiDownload /> Download Receipt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-processor">
      <div className="payment-header">
        <h2>Complete Your Payment</h2>
        <p>Amount: ₹{paymentDetails?.amount.toFixed(2)}</p>
      </div>

      <div className="payment-methods">
        <div className="payment-qr">
          <h3>Scan QR Code</h3>
          <div className="qr-container">
            <img 
              src={paymentDetails?.qrCodeUrl} 
              alt="Payment QR Code" 
              className="qr-image" 
              onError={(e) => {
                // Fallback if image doesn't load
                e.currentTarget.src = '/images/fallback-qr.png';
                setError('QR code image failed to load. Please use the UPI ID method.');
              }}
            />
          </div>
          <p className="qr-instruction">Scan with any UPI app (GPay, PhonePe, Paytm, etc.)</p>
        </div>

        <div className="payment-upi">
          <h3>Pay via UPI ID</h3>
          <div className="upi-id-container">
            <p className="upi-id">{paymentDetails?.upiId}</p>
            <button onClick={copyUpiId} className="copy-button">
              {copied ? <FiCheckCircle /> : <FiCopy />}
            </button>
          </div>
          <button onClick={handleUpiPayment} className="upi-button">
            Pay with UPI App
          </button>
          <p className="upi-instruction">Opens your UPI app automatically</p>
        </div>
      </div>

      <div className="payment-note">
        <p>{paymentDetails?.note}</p>
        <p className="reference">Payment Reference: {paymentDetails?.reference}</p>
      </div>

      <div className="payment-verification">
        <h3>Verify Your Payment</h3>
        <div className="payment-instructions">
          <h4>Payment Instructions:</h4>
          <ol>
            <li>Open any UPI app on your phone (Google Pay, PhonePe, Paytm, etc.)</li>
            <li>Scan the QR code shown above or use the UPI ID</li>
            <li>Enter the amount: ₹{paymentDetails?.amount.toFixed(2)}</li>
            <li>In the note, mention the reference number: {paymentDetails?.reference}</li>
            <li>Complete the payment</li>
            <li>Enter the UPI Transaction ID in the field below and click "Verify Payment"</li>
          </ol>
          
          <div className="support-contact">
            <h4>Need help?</h4>
            <p>Contact our support team:</p>
            <p>Phone: +91 9415070200</p>
            <p>Email: support@advancedentalclinic.com</p>
          </div>
        </div>
        <input
          type="text"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter UPI Transaction ID"
          className="transaction-input"
        />
        <button 
          onClick={verifyPayment} 
          className="verify-button"
          disabled={verifying}
        >
          {verifying ? 'Verifying...' : 'Verify Payment'}
        </button>
      </div>

      <div className="payment-footer">
        <button onClick={onCancel} className="cancel-payment">
          Cancel
        </button>
        <p className="security-notice">
          <FiCreditCard /> Secure UPI transaction
        </p>
      </div>
    </div>
  );
};

export default PaymentProcessor; 