import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import axios from "axios";
import { decode, encode } from "base-64";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "react-query";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const consumerKey1 = "ck_b2ccdd5849e099ef9e4a3e52a3edabd14f67d035";
const consumerSecret1 = "cs_d71b603b0ccd0f981331e151873819cbdebbb0c5";

const consumerKey = "ck_228e572a996092e7879760b466e485f24e98d5f6";
const consumerSecret = "cs_5fa6ba3ace73d79352a0d4aae646e3bf267652c2";

const local_consumerKey = "ck_fe0addf56211c2a2a112b2e8548545c97fbd39a7";
const local_consumerSecret = "cs_325254077602b5d398acefa518466b037b00c8d1";

const url1 = "https://beautikma.orgaliving.com/";
const url = "https://orgaliving.com/";

/* ********************** */
/* ********************** */
/* ********************** */
/* ********************** */

async function fetchWithTimeout(url, opts = {}, timeout = 5000) {
  const abortController = new AbortController();
  const { signal } = abortController;

  const _fetchPromise = fetch(url, {
    ...opts,
    signal,
  });
  const timer = setTimeout(() => abortController.abort(), timeout);

  try {
    const result = await _fetchPromise;
    clearTimeout(timer);
    return result;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

export const loginApiCall = (data) => {
  const options = {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(data),
  };
  return fetchWithTimeout(process.env.REACT_APP_API_AUTH_TOKEN, options, 2000)
    .then((res) => res.json())
    .catch((err) => err);
};

export const getCustomerApiCall = (userId) =>
  WooCommerce.get(`customers?email=${userId}`)
    .then((response) => response?.data)
    .catch((error) => error?.response?.data);

export const getHomeDataApi = async (category: string) =>
  await WooCommerce.get(`products/categories?search=${category}`);

export const getOrdersApi = async (customer: any) =>
  await WooCommerce.get(`orders?customer=${customer}`);

export const updateUserDetailsApi = (token: string, userId: any, user: any) => {
  return fetch(`${process.env.REACT_APP_API_ROOT}/users/${userId}`, {
    method: "put",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => err);
};

export const updateCustomerApi = (customer_id, data) =>
  WooCommerce.put(`customers/${customer_id}`, data)
    .then((response) => response.data)
    .catch((error) => error.response.data);

export const createProductReviewApi = (data) =>
  WooCommerce.post(`products/reviews`, data)
    .then((response) => response.data)
    .catch((error) => error.response.data);

export const allSettingOptions = () =>
  WooCommerce.get(`settings/general`)
    .then((response) => response.data)
    .catch((error) => error.response.data);

/* ********************** */
/* ********************** */
/* ********************** */
/* ********************** */

const WooCommerce = new WooCommerceRestApi({
  url: url,
  consumerKey: consumerKey,
  consumerSecret: consumerSecret,
  version: "wc/v3",
});

export const GET_CATEGORIES = async () => {
  return await WooCommerce.get("products/categories?search=promo");
};

export const GET_BANNER_PRODUCTS = async (category: string) => {
  return await WooCommerce.get(
    `products/categories?search=${
      !!category ? "section-slider" : "section-slider"
    }`
  );
};

export const GET_POPULAR_PRODUCTS = async (itemPerPgae: number) => {
  return await WooCommerce.get(
    `products?per_page=${itemPerPgae}&page=${1}&orderby=popularity`
  );
};

export const GET_TOP_SELLER = async () => {
  return await WooCommerce.get(`products/top_sellers?period=year`);
};

export const GET_CATEGORY = async (category_id: string) => {
  return await WooCommerce.get(`products/categories/${category_id}`);
};

export const getFeaturedData = async (itemsPerPage: number) => {
  return await WooCommerce.get(
    `products?featured=true&per_page=${itemsPerPage}&page=1`
  );
};

export const getOnSaleproducts = async (itemsPerPage: number) => {
  return await WooCommerce.get(
    `products?on_sale=true&per_page=${itemsPerPage}&page=1`
  );
};

export const onSearchCAll = async (query: string, itemsPerPage: number) => {
  //&per_page=${itemsPerPage}&page=1
  return await WooCommerce.get(`products?search=${query}`);
};

export const get_products_by_params = async (params: string) =>
  await WooCommerce.get(`${params}`);

export const getReports = () => {
  return WooCommerce.get("reports/orders/totals")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      Toast.show({
        type: "error",
        text1: error.response.data?.data.status,
        text2: error.response.data?.message,
      });
      return error.response.data;
    });
};

export const retrieveProductReviews = async (product_id) => {
  return await WooCommerce.get(`products/reviews?product=${product_id}`)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const deleteProductReviews = async (review_id) => {
  return await WooCommerce.delete(`products/reviews/${review_id}`)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

/* ----------------- */
/* ----------------- */
/* ----------------- */
/* ----------------- */
/* ----------------- */
/* ----------------- */
/* ----------------- */
/* ----------------- */
/* ----------------- */
/* ----------------- */
export const getProductsCall = async (
  category_id: string,
  itemPerPgae: number,
  orderByIndex: number,
  pageNumber: number
) => {
  /*  const filter = orderBy === "on_sale" ? "?on_sale=true" : `orderby=${orderBy}`;
  const res = await WooCommerce.get(
    `products?category=${category_id}&per_page=${itemPerPgae}&page=${pageNumber}`
  ); */
  let params = "";
  switch (orderByIndex) {
    case 1:
      params = `on_sale=true`;
      break;
    case 2:
      params = `orderby=date`;
      break;
    case 3:
      params = `orderby=price&order=asc`;
      break;
    case 4:
      params = `orderby=price&order=desc`;
      break;
    case 5:
      params = `orderby=title&order=asc`;
      break;
    default:
      params = ``;
      break;
  }
  const fullparam = `products?${params}&category=${category_id}&per_page=${itemPerPgae}&page=${pageNumber}`;

  return await WooCommerce.get(fullparam);
};

export const GET_RECOMENDED_PRODUCTS = async () => {
  return await WooCommerce.get("products/categories?slug=recommended");
};

export const GET_REPORTS = async () => {
  return await WooCommerce.get("reports/products/totals")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const GET_PRODUCTS_TOTAL = async () => {
  return await WooCommerce.get("reports/products/totals");
};

export const SERACH_PRODUCTS = async (
  productId?: any,
  itemsPerPage?: number
) => {
  let params = "";
  if (itemsPerPage) {
    params = `products?per_page=${itemsPerPage}`;
  } else if (productId) {
    params = `products/${productId}`;
  } else params = "products";

  return await WooCommerce.get(params);
};

export const GET_PRODUCTS = async (productId?: any, itemsPerPage?: number) => {
  let params = "";
  if (itemsPerPage) {
    params = `products?per_page=${itemsPerPage}`;
  } else if (productId) {
    params = `products/${productId}`;
  } else params = "products";

  return await WooCommerce.get(params);
};

export const GET_SHIPPING_MODES = async () => {
  return await WooCommerce.get("products/shipping_classes")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const GET_ALL_PRODUCT_REVIEWS = async () => {
  return await WooCommerce.get(`products/reviews`)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const CREATE_CUSTOMER = async (data: any) => {
  return WooCommerce.post("customers", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const CREATE_ORDER = async (data: any) => {
  return await WooCommerce.post(`orders`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => error.response.data);
};

export const get_payment_gateways = async () => {
  return await WooCommerce.get("payment_gateways")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const registerHandler = async (user) => {
  if (!user || !user?.username || !user?.email || !user?.password) return null;
  const res = await axios.post(
    `${process.env.REACT_APP_API_ROOT}/register`,
    user
  );
  return res.data;
};

export const GET_ORDERS = () => {
  return WooCommerce.get("orders")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
};

export const GET_CUSTOMER = () => {
  return WooCommerce.get("customers")
    .then((response) => response?.data)
    .catch((error) => error?.response?.data);
};
