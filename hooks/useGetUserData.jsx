// REACT IMPORTS
import { useCallback, useState } from "react";

// LIBRARIES
import { showMessage } from "react-native-flash-message";

// SOTRE
import { useUserStore } from "@/store";

// AXIOS
import { getCustomerProfile } from "@/api/customer";

const useGetUserData = () => {
  const setUserData = useUserStore((state) => state.setUserData);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCustomerData = useCallback(
    async (mobile) => {
      setIsLoading(true);
      try {
        const response = await getCustomerProfile(mobile);
        setUserData(response.data.itemList[0]);
        console.log("User Data Saved to store");
      } catch (error) {
        console.error(error);
        showMessage({
          message: error.response?.data?.message || error.message,
          type: "danger",
          titleStyle: {
            fontFamily: "IranSans-DemiBold",
            fontSize: 16,
            textAlign: "center",
          },
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setUserData]
  );

  return { fetchCustomerData, isLoading };
};

export default useGetUserData;
