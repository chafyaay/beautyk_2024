export const SET_ALL_PRODUCTS = "product/SET_ALL_PRODUCTS";
export const SET_PRODUCT = "product/SET_PRODUCT";
export const SET_ALL_CATEGORIES = "product/SET_ALL_CATEGORIES";
export const SET_CATEGORY = "product/SET_CATEGORY";
export const HOME_PROMOTION_BANNER = "product/HOME_PROMOTION_BANNER";
export const HOME_CATEGORIES_SLIDER = "product/HOME_CATEGORIES_SLIDER";
export const HOME_BANNERS = "product/HOME_BANNERS";

export const setAllProducts = (data) => ({
  type: SET_ALL_PRODUCTS,
  data,
});

export const setProduct = (product_id) => ({
  type: SET_PRODUCT,
  product_id,
});

export const setAllcategories = (data) => ({
  type: SET_ALL_CATEGORIES,
  data,
});

export const setcategory = (product_id) => ({
  type: SET_CATEGORY,
  category_id,
});

export const setHomePromotionBanner = (data) => ({
  type: HOME_PROMOTION_BANNER,
  data,
});

export const setHomeCategoriesSlider = (data) => ({
  type: HOME_CATEGORIES_SLIDER,
  data,
});

export const setHomeBanners = (data) => ({
  type: HOME_BANNERS,
  data,
});
