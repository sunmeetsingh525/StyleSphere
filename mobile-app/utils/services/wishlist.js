import { callApi } from "../apiUtils";
import { wishlistEndpoints } from "../endpoints/wishlist";

export const getWishListService = ({ query }) =>
  callApi({
    uriEndPoint: wishlistEndpoints.getWishList.v1,
  });

export const addToWishListService = ({ body }) =>
  callApi({
    uriEndPoint: wishlistEndpoints.addToWishList.v1,
    body,
  });
