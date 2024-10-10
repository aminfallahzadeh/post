import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useUserStore = create(
  devtools((set) => ({
    mobile: null,
    userData: null,

    setMobile: (mobile) => set({ mobile }),
    setUserData: (userData) => set({ userData }),
  }))
);
