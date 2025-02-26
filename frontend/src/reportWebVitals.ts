import { ReportHandler } from 'web-vitals';

interface DentalClinicMetrics {
  appointmentLoadTime?: number;
  chatbotResponseTime?: number;
  modelRenderTime?: number;
}

type ExtendedReportHandler = ReportHandler & {
  (metrics: DentalClinicMetrics): void;
};

const reportWebVitals = (onPerfEntry?: ExtendedReportHandler): void => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Core Web Vitals
      getCLS(onPerfEntry);  // Cumulative Layout Shift
      getFID(onPerfEntry);  // First Input Delay
      getFCP(onPerfEntry);  // First Contentful Paint
      getLCP(onPerfEntry);  // Largest Contentful Paint
      getTTFB(onPerfEntry); // Time to First Byte

      const measureAppointmentLoad = (): void => {
        const appointmentMetric = {
          appointmentLoadTime: performance.now(),
          name: 'appointment-load',
        };
        onPerfEntry(appointmentMetric as any);
      };

      const measureChatbotResponse = (): void => {
        const chatbotMetric = {
          chatbotResponseTime: performance.now(),
          name: 'chatbot-response',
        };
        onPerfEntry(chatbotMetric as any);
      };

      const measure3DModelRender = (): void => {
        const modelMetric = {
          modelRenderTime: performance.now(),
          name: '3d-model-render',
        };
        onPerfEntry(modelMetric as any);
      };

      window.dentalMetrics = {
        measureAppointmentLoad,
        measureChatbotResponse,
        measure3DModelRender,
      };
    });
  }
};

declare global {
  interface Window {
    dentalMetrics: {
      measureAppointmentLoad: () => void;
      measureChatbotResponse: () => void;
      measure3DModelRender: () => void;
    };
  }
}

export default reportWebVitals; 