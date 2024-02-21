import { defaults } from "./default";

export const userEndPoints = {
  currentUser: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/user/me",
    },
  },
};
