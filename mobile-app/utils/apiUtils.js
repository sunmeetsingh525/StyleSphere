/**
 * Utility methods to be used for invoking API methods
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import queryString from "querystring";
export const hostname = () => {
  let hostUrl = "https://sunmeet.upforks.com/api";
  return hostUrl;
};
const hostUrl = hostname();
export const makeUrl = ({ uri = "", pathParams, query, version }, host) =>
  `${host || hostUrl}${version || ""}${uri
    .split("/")
    .map((param) =>
      param.charAt(0) === ":" ? encodeURI(pathParams[param.slice(1)]) : param
    )
    .join("/")}${query ? `?${queryString.stringify(query)}` : ""}`;
export const getDefaultHeaders = async (multipart) => {
  const authorization = await AsyncStorage.getItem("accessToken");
  const contentType = multipart ? "multipart/form-data" : "application/json";
  return {
    authorization,
    "Content-Type": contentType,
  };
};
/**
 * Returns true if the input apiResponse has errors.
 * @param {*} apiResponse
 */
export const hasErrors = (apiResponse) => {
  const { error } = apiResponse;
  if (error) {
    return true;
  }
  return false;
};
/**
 * Generic utility method that should be called when invokin REST API
 *
 * This function streamlines the functionality to make api calls,
 * and carries easy management for controlling versions of the apis
 *
 * @since 1.0.0
 *
 * @todo all the incoming values for the APIParamaters.pathParams and APIParamaters.query
 * should be uri encoded.
 * @alias callAxios
 * @memberof apiUtils
 * @param {Object} APIParamaters - Set of objects required to make the api call.
 * @param {Object} APIParamaters.uriEndPoint - Endpoint object as described in apiEndPoints.js.
 * @param {String} APIParamaters.uriEndPoint.api - Path to your endpoint
 * @param {String} APIParamaters.uriEndPoint.method - POST/GET/PUT/DELETE etc.
 * @param {String} APIParamaters.uriEndPoint.version - Versioning of your api
 * @param {Object} APIParamaters.uriEndPoint.headerProps - Object of headers you want to pass.
 * @param {Object} APIParamaters.pathParams - Path parameters. Example :id in the path,
 * then pathParams object will be {id:value}.
 * @param {Object} APIParamaters.query - GET/POST/PUT/DELETE Endpoint.
 * @param {Object} APIParamaters.body - Body of the request.
 * @returns {Promise<object>} Body Data from the server.
 */
const callAxios = async (
  {
    uriEndPoint,
    pathParams,
    query,
    body,
    apiHostUrl,
    multipart,
    onUploadProgress,
  },
  options
) => {
  const defHeaders = await getDefaultHeaders(multipart);
  let headers = {};
  if (!options?.hideDefaultHeaders) {
    headers = {
      ...defHeaders,
    };
  }
  return Axios({
    method: uriEndPoint.method,
    url: makeUrl({ ...uriEndPoint, pathParams, query }, apiHostUrl),
    headers: {
      ...headers,
      ...uriEndPoint.headerProps,
    },
    data: body || undefined,
    onUploadProgress,
  });
};
/**
 * Extract the error messages from a failed API response.
 * @param {} apiResponse
 */
// const extractErrors = () => {};
/**
 * Generic utility method that should be called when invokin REST API
 *
 * This function streamlines the functionality to make api calls,
 * and carries easy management for controlling versions of the apis
 *
 * @since 2.0.0
 *
 * @todo all the incoming values for the APIParamaters.pathParams and APIParamaters.query
 * should be uri encoded.
 * @alias callApi
 * @memberof apiUtils
 * @param {Object} APIParamaters - Set of objects required to make the api call.
 * @param {Object} APIParamaters.uriEndPoint - Endpoint object as described in apiEndPoints.js.
 * @param {String} APIParamaters.uriEndPoint.api - Path to your endpoint
 * @param {String} APIParamaters.uriEndPoint.method - POST/GET/PUT/DELETE etc.
 * @param {String} APIParamaters.uriEndPoint.version - Versioning of your api
 * @param {Object} APIParamaters.uriEndPoint.headerProps - Object of headers you want to pass.
 * @param {Object} APIParamaters.pathParams - Path parameters. Example :id in the path,
 * then pathParams object will be {id:value}.
 * @param {Object} APIParamaters.query - GET/POST/PUT/DELETE Endpoint.
 * @param {Object} APIParamaters.body - Body of the request.
 * @returns {Promise<object>} Body Data from the server.
 */
export const callApi = (
  {
    uriEndPoint = {
      uri: "",
      method: "",
      version: "",
      headerProps: {},
      service: "",
    },
    pathParams,
    query,
    body,
    apiHostUrl,
    multipart,
  },
  options
) =>
  new Promise((resolve, reject) => {
    callAxios(
      {
        uriEndPoint,
        pathParams,
        query,
        body,
        apiHostUrl,
        multipart,
      },
      options
    )
      .then((response) => {
        resolve(response.data);
        // localStorage.setItem("timer", 1800);
      })
      .catch((err) => {
        if (!err.response) {
          reject(err);
          // if (!getPageQuery().redirect) {
          //   // history.push(
          //   //   `/server-unreachable?${stringify({
          //   //     redirect: window.location.href,
          //   //   })}`,
          //   // );
          // }
          return;
        }
        if (err?.response?.status === 401) {
          //   history.push(
          //     `/user/login?${stringify({
          //       redirect: window.location.href,
          //     })}`
          //   );
          // unauthorized
          //   clearLocalStroage();
          reject(err.response);
        }
        if (err?.response) {
          reject(err.response);
        }
      });
  });
