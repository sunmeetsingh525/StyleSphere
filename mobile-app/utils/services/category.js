import { callApi } from "../apiUtils";
import { categoryEndpoints } from "../endpoints/category";
export const getCategoryService = ({ query }) =>
  callApi({
    uriEndPoint: categoryEndpoints.getCategory.v1,
    query,
  });
