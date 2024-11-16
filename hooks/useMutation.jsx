// IMPORTS
import { useState, useCallback, useRef } from "react";
import { toastConfig } from "@/config/toast-config";

const useMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const lastestMutationFn = useRef(null);
  const latestParams = useRef(null);
  const latestData = useRef(null);

  const fetchMutation = useCallback(
    async (mutationFn, params, data, hasMessage) => {
      setIsLoading(true);
      lastestMutationFn.current = mutationFn;
      latestParams.current = params;
      latestData.current = data;

      try {
        const response =
          params === undefined
            ? await mutationFn(data)
            : data === undefined
            ? await mutationFn(params)
            : await mutationFn(params, data);
        if (hasMessage) {
          toastConfig.success(response?.data?.message);
        }
        return response;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const refetch = useCallback(async () => {
    if (lastestMutationFn.current) {
      setIsLoading(true);
      try {
        const response = await lastestMutationFn.current(
          latestParams.current,
          latestData.current
        );
        return response;
      } finally {
        setIsLoading(false);
      }
    }
    return null;
  }, []);

  return { isLoading, fetchMutation, refetch };
};

export default useMutation;
