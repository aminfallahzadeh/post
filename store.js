import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useUserStore = create(
  devtools((set) => ({
    mobile: null,
    userData: null,
    complaintFormData: {},
    addressByPostCode: [],

    setMobile: (mobile) => set({ mobile }),
    setUserData: (userData) => set({ userData }),
    setComplaintFormData: (complaintFormData) =>
      set((state) => ({
        complaintFormData: { ...state.complaintFormData, ...complaintFormData },
      })),

    removeComplaintData: () => set({ complaintFormData: {} }),

    setAddressByPostCode: (addressByPostCode) => set({ addressByPostCode }),
  }))
);
