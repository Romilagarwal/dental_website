import { Analytics } from '@vercel/analytics';
import mixpanel from 'mixpanel-browser';
import { hotjar } from 'react-hotjar';

export const initializeAnalytics = () => {
  // Vercel Analytics
  Analytics.init();

  // Mixpanel
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!);

  // Hotjar
  hotjar.initialize(
    parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID!),
    parseInt(process.env.NEXT_PUBLIC_HOTJAR_VERSION!)
  );
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  mixpanel.track(eventName, properties);
};

export const identifyUser = (userId: string, traits?: Record<string, any>) => {
  mixpanel.identify(userId);
  if (traits) {
    mixpanel.people.set(traits);
  }
}; 