import { callApi } from "../apiUtils";
import { userEndPoints } from "../endpoints/user";

export const getCurrentUser = () =>
  callApi({
    uriEndPoint: userEndPoints.currentUser.v1,
  });
