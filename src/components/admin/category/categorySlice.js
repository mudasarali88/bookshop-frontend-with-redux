import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../services/httpService";
import { API } from "../../../config";

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async () => {
    const { data } = await http.get(`${API}/category/all`);
    return data;
  }
);

const initialState = {
  categories: undefined,
  status: "idle",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories?.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.status = "succeeded";
    });
  },
});

export const { addCategory } = categorySlice.actions;
export default categorySlice.reducer;
export const categories = (state) => state.root.category.categories;
export const status = (state) => state.root.category.status;
