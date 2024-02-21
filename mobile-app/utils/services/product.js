import { callApi } from "../apiUtils";
import { productEndpoints } from "../endpoints/products";
export const getProductServices = ({ query }) =>
  callApi({
    uriEndPoint: productEndpoints.getProducts.v1,
    query,
  });
