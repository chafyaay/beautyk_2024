import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { decode, encode } from "base-64";
import Toast from "react-native-toast-message";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const consumerKey = "ck_8aeb2ee566ad98fb3c060737edfe55adf2bc1117";
const consumerSecret = "cs_6e0337bfb66f8f23331f78da09daa2bb240c95f5";
const url = "https://bazbotik-f5f7db.ingress-daribow.ewp.live/";

const WooCommerce = new WooCommerceRestApi({
  url: url,
  consumerKey: consumerKey,
  consumerSecret: consumerSecret,
  version: "wc/v3",
});

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
    .catch((err) => {
      Toast.show({ type: "error", props: { msg: JSON.stringify(err) } });

      throw err;
    });
};

export const getCustomerApiCall = (userId) =>
  WooCommerce.get(`customers?email=${userId}`)
    .then((response) => response?.data[0])
    .catch((error) => error?.response?.data);

export const getHomeDataApi = async (category: string) =>
  await WooCommerce.get(`products/categories?search=${category}`);

export const getOrdersApiCall = async (customer: any) =>
  await WooCommerce.get(`orders?customer=${customer}`)
    .then((response) => response.data)
    .catch((error) => error.response.data);

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

export const getProductsTotals = async () =>
  await WooCommerce.get("reports/products/totals")
    .then((response) => response.data)
    .catch((error) => error.response.data);

export const getAllCategories = async () =>
  await WooCommerce.get("reports")
    .then((response) =>
      response.data.filter((item) => item.slug === "categories/totals")
    )
    .catch((error) => error.response.data);

export const updateCustomer = async (data) => {
  return await WooCommerce.update(`customers/${data.id}/${data}`);
};

export const retrieveProducts = async (params: string) =>
  await WooCommerce.get(`${params}`);

export const deleteProduct = async (id) =>
  await WooCommerce.delete(`products/${id}`);

export const ListAllShippingMethodsApiCall = async () =>
  await WooCommerce.get(`shipping_methods`)
    .then((response) => response.data)
    .catch((error) => error.response.data);

export const get_payment_gateways = async () => {
  return await WooCommerce.get("payment_gateways")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const createOrderApiCall = async (data: any) => {
  return await WooCommerce.post(`orders`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => error.response.data);
};

export const getProductsShippingModeApiCall = async () => {
  return await WooCommerce.get("products/shipping_classes")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const getFeaturedData = async (itemsPerPage: number) => {
  return await WooCommerce.get(
    `products?featured=true&per_page=${itemsPerPage}&page=1`
  );
};
