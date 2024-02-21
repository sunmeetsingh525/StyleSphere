import { defaults } from "./default";

export const wishlistEndpoints = {
  getWishList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/wishlist",
    },
  },
  addToWishList: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/wishlist",
    },
  },
};
