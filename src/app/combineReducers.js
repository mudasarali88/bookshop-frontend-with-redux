import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../components/user/userSlice";
import categoryReducer from "../components/admin/category/categorySlice";
import productReducer from "../components/admin/product/productSlice";

export default combineReducers({
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
});
