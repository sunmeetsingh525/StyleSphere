import { defaults } from "./default";

export const orderEndpoints = {
  getSecretKey: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/stripe",
    },
  },
  createOrder: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/order",
    },
  },
};
