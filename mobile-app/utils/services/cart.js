import { callApi } from "../apiUtils";
import { cartEndpoints } from "../endpoints/cart";

export const getCartService = ({ query }) =>
  callApi({
    uriEndPoint: cartEndpoints.getCart.v1,
  });

export const addToCartService = ({ body }) =>
  callApi({
    uriEndPoint: cartEndpoints.addToCart.v1,
    body,
  });

export const deleteProductService = ({ pathParams }) =>
  callApi({
    uriEndPoint: cartEndpoints.deleteProduct.v1,
    pathParams,
  });
