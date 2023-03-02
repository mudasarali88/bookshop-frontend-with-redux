import axios from "axios";
import logService from "./logService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logService.log(error);
    alert("An unexpected error occoured");
    toast.error("An unexpected error occoured");
  }
  return Promise.reject(error);
});
// unexpected error
// intercept response object for global error handling
// axios.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     const expectedError =
//       err.response && err.response.status >= 400 && err.response.status < 500;

//     //unexpected error
//     if (!expectedError) {
//       console.log("Logging the error", err);
//       toast.error("An unexpected error occur!", { theme: "dark" });
//     }
//     //expected error
//     if (err.response && err.response.data && err.response.data.message)
//       toast.error(err.response.data.message, { theme: "dark" });
//     return Promise.reject(err);
//   }
// );

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
