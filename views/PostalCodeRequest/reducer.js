export const initialState = {
  isUrban: true,
  isLoading: {
    province: false,
    county: false,
    zone: false,
    ruralCity: false,
    village: false,
  },
  options: {
    province: [],
    county: [],
    zone: [],
    ruralCity: [],
    village: [],
  },
  data: {
    province: [],
    county: [],
    zone: [],
    ruralCity: [],
    village: [],
  },
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.key]: action.payload.value,
        },
      };
    case "SET_DATA":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.key]: action.payload.value,
        },
      };
    case "SET_OPTIONS":
      return {
        ...state,
        options: {
          ...state.options,
          [action.payload.key]: action.payload.value,
        },
      };
    case "TOGGLE_MODE":
      return {
        ...state,
        isUrban: !state.isUrban,
      };
    default:
      return state;
  }
}
