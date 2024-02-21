import { callApi } from "../apiUtils";
import { authEndPoints } from "../endpoints/auth";
export const loginService = ({ body }) =>
  callApi({
    uriEndPoint: authEndPoints.login.v1,
    body,
  });

export const registerService = ({ body }) =>
  callApi({
    uriEndPoint: authEndPoints.signup.v1,
    body,
  });
