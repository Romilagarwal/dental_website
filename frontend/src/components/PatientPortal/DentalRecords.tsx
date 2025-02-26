import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiDownload, FiEye } from 'react-icons/fi';

interface DentalRecord {
  id: string;
  date: string;
  type: string;
  dentist: string;
  notes: string;
  attachments: string[];
}

const DentalRecords: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);

  const records: DentalRecord[] = [
    {
      id: '1',
      date: '2024-02-15',
      type: 'Root Canal Treatment',
      dentist: 'Dr. Reishu Agarwal',
      notes: 'Successful root canal treatment on tooth #16. Follow-up scheduled in 2 weeks.',
      attachments: ['xray-before.jpg', 'xray-after.jpg']
    },
    // Add more records...
  ];

  return (
    <div className="dental-records">
      <h3 className="text-xl font-bold mb-6">Dental Records</h3>
      
      <div className="records-list">
        {records.map((record) => (
          <motion.div
            key={record.id}
            className="record-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="record-header">
              <div className="record-type">
                <FiFileText className="icon" />
                <h4>{record.type}</h4>
              </div>
              <span className="record-date">
                {new Date(record.date).toLocaleDateString()}
              </span>
            </div>

            <div className="record-details">
              <p className="dentist">Dentist: {record.dentist}</p>
              <p className="notes">{record.notes}</p>
            </div>

            {record.attachments.length > 0 && (
              <div className="attachments">
                <h5>Attachments</h5>
                <div className="attachment-list">
                  {record.attachments.map((file) => (
                    <div key={file} className="attachment">
                      <span>{file}</span>
                      <div className="actions">
                        <button className="view-btn">
                          <FiEye />
                        </button>
                        <button className="download-btn">
                          <FiDownload />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DentalRecords; 