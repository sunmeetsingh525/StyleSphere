import { defaults } from "./default";

export const cartEndpoints = {
  getCart: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/cart",
    },
  },
  addToCart: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/cart",
    },
  },
  deleteProduct: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/cart/:id",
    },
  },
};
