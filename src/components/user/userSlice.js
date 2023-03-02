import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/httpService";
import { API } from "../../config";

const token = JSON.parse(localStorage.getItem("jwt"));
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const getPurchaseHistory = createAsyncThunk(
  "user/purchaseHistory",
  async (userId) => {
    const { data } = await http.get(`${API}/orders/history/${userId}`, config);
    return data;
  }
);

export const getUpdatedUser = createAsyncThunk(
  "user/updatedUser",
  async (userId, body) => {
    const { data } = await http.put(`${API}/user/${userId}`, body, config);
    return data;
  }
);

const initialState = {
  purchaseHistory: undefined,
  currentUser: undefined,
  updatedUser: undefined,
  userStatus: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.currentUser = action.payload;
      state.userStatus = "succeeded";
    },
    removeUser: (state) => {
      state.currentUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPurchaseHistory.fulfilled, (state, action) => {
        state.purchaseHistory = action.payload;
      })
      .addCase(getUpdatedUser.fulfilled, (state, action) => {
        state.updatedUser = action.payload;
      });
  },
});

export const { saveUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
export const currentUser = (state) => state.root.user.currentUser;
export const purchaseHistory = (state) => state.root.user.purchaseHistory;
export const updatedUser = (state) => state.root.user.updatedUser;
