import React from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiDownload, FiCreditCard } from 'react-icons/fi';

interface Payment {
  id: string;
  date: string;
  amount: number;
  treatment: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  invoiceUrl: string;
}

const PaymentHistory: React.FC = () => {
  const payments: Payment[] = [
    {
      id: '1',
      date: '2024-02-15',
      amount: 8000,
      treatment: 'Root Canal Treatment',
      status: 'completed',
      paymentMethod: '**** **** **** 4242',
      invoiceUrl: '/invoices/INV-001.pdf'
    },
    // Add more payments...
  ];

  return (
    <div className="payment-history">
      <h3 className="text-xl font-bold mb-6">Payment History</h3>

      <div className="payments-list">
        {payments.map((payment) => (
          <motion.div
            key={payment.id}
            className={`payment-card ${payment.status}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="payment-header">
              <div className="amount">
                <FiDollarSign className="icon" />
                <span>₹{payment.amount.toLocaleString()}</span>
              </div>
              <span className={`status ${payment.status}`}>
                {payment.status}
              </span>
            </div>

            <div className="payment-details">
              <p className="treatment">{payment.treatment}</p>
              <p className="date">
                {new Date(payment.date).toLocaleDateString()}
              </p>
              <div className="payment-method">
                <FiCreditCard className="icon" />
                <span>{payment.paymentMethod}</span>
              </div>
            </div>

            <button className="download-invoice">
              <FiDownload className="icon" />
              Download Invoice
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory; 