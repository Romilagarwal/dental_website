import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiCalendar, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import RevenueChart from './Charts/RevenueChart.tsx';
import AppointmentChart from './Charts/AppointmentChart.tsx';

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: React.ComponentType;
  color: string;
}

const DashboardStats: React.FC = () => {
  const stats: StatCard[] = [
    {
      title: 'Total Patients',
      value: '2,547',
      change: 12.5,
      icon: FiUsers,
      color: 'bg-blue-500'
    },
    {
      title: 'Appointments Today',
      value: 24,
      change: 8.2,
      icon: FiCalendar,
      color: 'bg-green-500'
    },
    {
      title: 'Monthly Revenue',
      value: '₹3,25,000',
      change: 15.3,
      icon: FiDollarSign,
      color: 'bg-purple-500'
    },
    {
      title: 'Growth Rate',
      value: '22%',
      change: 5.1,
      icon: FiTrendingUp,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="dashboard-stats">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`icon-wrapper ${stat.color}`}>
              <stat.icon />
            </div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
              <span className={`stat-change ${stat.change >= 0 ? 'positive' : 'negative'}`}>
                {stat.change >= 0 ? '+' : ''}{stat.change}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add charts and graphs here */}
      <div className="stats-charts">
        {/* Revenue Chart */}
        <div className="chart-container">
          <h3>Revenue Overview</h3>
          <RevenueChart />
        </div>

        {/* Appointment Distribution */}
        <div className="chart-container">
          <h3>Appointment Distribution</h3>
          <AppointmentChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
