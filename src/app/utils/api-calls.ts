import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import axios from "axios";
import { decode, encode } from "base-64";
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

const url1 = "https://beautikma.orgaliving.com/";
const url = "https://orgaliving.com/";

const WooCommerce = new WooCommerceRestApi({
  url: url,
  consumerKey: consumerKey,
  consumerSecret: consumerSecret,
  version: "wc/v3",
  queryStringAuth: true,
  view_woocommerce_reports: true,
  manage_woocommerce: true,
  limit: "10",
  columns: "4",
  orderby: "total_sales",
  order: "DESC",
});

export const GET_CATEGORIES = async () => {
  return await WooCommerce.get("products/categories?search=promo");
};

export const GET_RECOMENDED_PRODUCTS = async () => {
  return await WooCommerce.get("products/categories?slug=recommended");
};

export const GET_PRODUCTS = async () => {
  return await WooCommerce.get("products");
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
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
};

export const LOGIN = async () => {
  return WooCommerce.get(
    "customers?username=y.chafyaay@gmail.com&password=Chy@@1986!!"
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
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

export const loginHandler = async ({ email, password }) => {
  const data = { username: email, password: password };
  const res = await axios.post(process.env.REACT_APP_API_AUTH_TOKEN, data);
  return res.data;
};

export const registerHandler = async (user) => {
  if (!user || !user?.username || !user?.email || !user?.password) return null;
  const res = await axios.post(
    `${process.env.REACT_APP_API_ROOT}/register`,
    user
  );
  return res.data;
};
