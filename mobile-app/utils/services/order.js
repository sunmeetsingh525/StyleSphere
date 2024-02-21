import { callApi } from "../apiUtils";
import { orderEndpoints } from "../endpoints/order";
export const getSecretKeyService = ({ query }) =>
  callApi({
    uriEndPoint: orderEndpoints.getSecretKey.v1,
    query,
  });
export const createOrderservice = ({ body }) =>
  callApi({
    uriEndPoint: orderEndpoints.createOrder.v1,
    body,
  });
