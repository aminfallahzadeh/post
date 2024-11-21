// IMPORTS
import { useCallback } from "react";
import { optionsGenerator } from "@/helpers/selectHelper";

import {
  getProvince,
  getCounty,
  getZone,
  getRuralCity,
  getVillage,
} from "@/api/gnaf";

export const useFetchData = (dispatch, setValue) =>
  useCallback(
    async (type, params) => {
      dispatch({ type: "SET_LOADING", payload: { key: type, value: true } });

      try {
        const fetchers = {
          province: getProvince,
          county: getCounty,
          zone: getZone,
          ruralCity: getRuralCity,
          village: getVillage,
        };

        const response = await fetchers[type](params);
        const data = JSON.parse(response.data.noneobject).value;

        dispatch({
          type: "SET_OPTIONS",
          payload: {
            key: type,
            value: optionsGenerator(data, "id", "name"),
          },
        });

        dispatch({
          type: "SET_DATA",
          payload: {
            key: type,
            value: data,
          },
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: { key: type, value: false } });
      }
    },
    [dispatch]
  );
