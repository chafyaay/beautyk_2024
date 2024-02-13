import {
  HOME_PROMOTION_BANNER,
  HOME_BANNERS,
  HOME_CATEGORIES_SLIDER,
} from "../actions/product.action";

const intialHomeDataReducer = {
  promotion: [],
  banner: [],
  categoris_slider: [],
};

export const homeDataReducers = (state = intialHomeDataReducer, action) => {
  switch (action.type) {
    case HOME_PROMOTION_BANNER:
      state = { ...state, promotion: action.data };
      return state;

    case HOME_BANNERS:
      state = { ...state, banner: action.data };
      return state;

    case HOME_CATEGORIES_SLIDER:
      state = { ...state, categoris_slider: action.data };
      return state;

    default:
      return state;
  }
};
