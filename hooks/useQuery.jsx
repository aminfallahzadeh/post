// IMPORTS
import { useState, useCallback, useRef } from "react";

const useQuery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const latestQueryFn = useRef(null);
  const latestParams = useRef(null);

  const fetchQuery = useCallback(async (queryFn, params = {}) => {
    setIsLoading(true);
    latestQueryFn.current = queryFn;
    latestParams.current = params;

    try {
      const response = await queryFn(params);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    if (latestQueryFn.current) {
      setIsLoading(true);
      try {
        const response = await latestQueryFn.current(latestParams.current);
        return response;
      } finally {
        setIsLoading(false);
      }
    }
    return null;
  }, []);

  return { isLoading, fetchQuery, refetch };
};

export default useQuery;
