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

export const useFetchData = (dispatch) =>
  useCallback(
    async (type, params, isUrban) => {
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
        console.log("PARSED DATA:", data);

        dispatch({
          type: "SET_OPTIONS",
          payload: {
            key: type,
            // value: optionsGenerator(data, "id", "name"),
            value:
              type === "ruralCity"
                ? isUrban
                  ? optionsGenerator(data, "city_id", "name")
                  : optionsGenerator(data, "rural_id", "name")
                : optionsGenerator(data, "id", "name"),
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
