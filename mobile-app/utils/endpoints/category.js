import { defaults } from "./default";

export const categoryEndpoints = {
  getCategory: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/category",
    },
  },
};
