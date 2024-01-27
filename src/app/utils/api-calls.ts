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

const local_consumerKey = "ck_fe0addf56211c2a2a112b2e8548545c97fbd39a7";
const local_consumerSecret = "cs_325254077602b5d398acefa518466b037b00c8d1";

const url1 = "https://beautikma.orgaliving.com/";
const url = "https://orgaliving.com/";

export const LOGIN_HANDLER = async (data) => {
  const res = await axios.post(process.env.REACT_APP_API_AUTH_TOKEN, {
    username: data?.email,
    password: data?.password,
  });
  return res.data;
};

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

export const GET_TOP_SELLER = async () => {
  return await WooCommerce.get(`reports/top_sellers?period=year`);
};

export const GET_CATEGORY = async (category_id: string) => {
  return await WooCommerce.get(`products/categories/${category_id}`);
};

export const GET_PRODUCTS_BY_PRODUCTS_PER_PAGE = async (
  category_id: string,
  itemPerPgae: number,
  pageNumber: number
) => {
  console.log("#", category_id, "#", itemPerPgae, "#", pageNumber);

  return await WooCommerce.get(
    `products?category=${category_id}&per_page=${itemPerPgae}&page=${pageNumber}`
  );
};

export const GET_BANNER_BY_SECTION = async (category: string) => {
  return await WooCommerce.get(`products/categories?search=${category}`);
};

export const GET_RECOMENDED_PRODUCTS = async () => {
  return await WooCommerce.get("products/categories?slug=recommended");
};

export const GET_REPORTS = async () => {
  return await WooCommerce.get("reports/products/totals")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const GET_PRODUCTS = async () => {
  return await WooCommerce.get("products?filter[limit]=-1");
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
