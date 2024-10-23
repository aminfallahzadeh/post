import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useUserStore = create(
  devtools((set) => ({
    mobile: null,
    userData: null,
    complaintFormData: {},

    setMobile: (mobile) => set({ mobile }),
    setUserData: (userData) => set({ userData }),
    setComplaintFormData: (complaintFormData) =>
      set((state) => ({
        complaintFormData: { ...state.complaintFormData, ...complaintFormData },
      })),

    removeComplaintData: () => set({ complaintFormData: {} }),
  })),
);
