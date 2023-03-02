import { API } from "../../config";
import http from "../../services/httpService";
import { getCurrentUser } from "../helper/helper";

const user = getCurrentUser();

const token = JSON.parse(localStorage.getItem("jwt"));
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const signup = async (body) => {
  return await http.post(`${API}/signup`, body);
};
export const signin = async (body) => {
  return await http.post(`${API}/signin`, body);
};

export const updateUser = async (userId, body) => {
  try {
    return await http.put(`${API}/user/${userId}`, body, config);
  } catch (error) {
    console.log(error);
  }
};
