// IMPORTS
import { useCallback, useState } from "react";
import { useUserStore } from "@/store";
import { getCustomerProfile } from "@/api/customer";

const useGetUserData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setUserData = useUserStore((state) => state.setUserData);

  const fetchCustomerData = useCallback(
    async (mobile) => {
      setIsLoading(true);
      try {
        const response = await getCustomerProfile(mobile);
        setUserData(response.data.itemList[0]);
        console.log("User Data Saved to store");
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setUserData]
  );

  return { fetchCustomerData, isLoading };
};

export default useGetUserData;
