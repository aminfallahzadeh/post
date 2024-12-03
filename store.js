import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  mobile: null,
  userData: null,
  complaintFormData: {},
  addressByPostCode: [],
  factor: {},
  userAddress: "",
  userAddressCodes: {},
  foundDocIds: [],
};

export const useUserStore = create(
  devtools((set) => ({
    ...initialState,

    setMobile: (mobile) => set({ mobile }),
    setUserData: (userData) => set({ userData }),
    setComplaintFormData: (complaintFormData) =>
      set((state) => ({
        complaintFormData: { ...state.complaintFormData, ...complaintFormData },
      })),

    setFactor: (factor) => set({ factor }),

    removeComplaintData: () => set({ complaintFormData: {} }),

    setAddressByPostCode: (addressByPostCode) => set({ addressByPostCode }),

    setUserAddress: (userAddress) => set({ userAddress }),
    setUserAddressCodes: (userAddressCodes) => set({ userAddressCodes }),

    setFoundDocIds: (foundDocIds) => set({ foundDocIds }),

    resetStore: () => set(initialState),
  }))
);
