import create from 'zustand';

interface StoreState {
  user: {
    isLoggedIn: boolean;
    name: string | null;
  };
  appointments: any[];
  setUser: (user: { isLoggedIn: boolean; name: string | null }) => void;
  setAppointments: (appointments: any[]) => void;
}

const useStore = create<StoreState>((set) => ({
  user: { isLoggedIn: false, name: null },
  appointments: [],
  setUser: (user) => set({ user }),
  setAppointments: (appointments) => set({ appointments }),
}));

export default useStore;
