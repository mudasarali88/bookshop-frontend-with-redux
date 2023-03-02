import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../services/httpService";
import { API } from "../../../config";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (sortBy = "sold" | "createdAt") => {
    const { data } = await http.get(
      `${API}/product/?sortBy=${sortBy}&order=desc&limit=8`
    );
    return data;
  }
);
export const getRelatedProducts = createAsyncThunk(
  "product/relatedProducts",
  async (productId) => {
    const { data } = await http.get(`${API}/product/related/${productId}`);
    return data;
  }
);

export const getSingleProduct = createAsyncThunk(
  "product/singleProduct",
  async (productId) => {
    const { data } = await http.get(`${API}/product/${productId}`);
    return data;
  }
);

const initialState = {
  allProducts: undefined,
  productsByArrival: undefined,
  productsBySell: undefined,
  productsBySearch: undefined,
  relatedProducts: undefined,
  product: undefined,
  statusSell: "idle",
  statusArrival: "idle",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductsBySearch: (state, action) => {
      state.productsBySearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        if (action.meta.arg === "sold") {
          state.statusSell = "succeeded";
          state.productsBySell = action.payload;
        } else {
          state.statusArrival = "succeeded";
          state.productsByArrival = action.payload;
        }
      })
      .addCase(getRelatedProducts.fulfilled, (state, action) => {
        state.relatedProducts = action.payload;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  },
});

export default productSlice.reducer;
export const { getProductsBySearch } = productSlice.actions;
export const statusSell = (state) => state.root.product.statusSell;
export const statusArrival = (state) => state.root.product.statusArrival;
export const productsByArrival = (state) =>
  state.root.product.productsByArrival;
export const productsBySell = (state) => state.root.product.productsBySell;
export const relatedProducts = (state) => state.root.product.relatedProducts;
export const productsBySearch = (state) => state.root.product.productsBySearch;
export const product = (state) => state.root.product.product;
