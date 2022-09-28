import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchUserRequest = createAsyncThunk(
  "tickets/fetchUserRequests",
  async () => {
    const { data } = await axios.get("/user-request");
    return data;
  }
);
export const fetchIncidents = createAsyncThunk(
  "tickets/fetchIncidents",
  async () => {
    const { data } = await axios.get("/incident");
    return data;
  }
);

const initialState = {
  userRequests: {
    items: [],
    status: "loading",
  },
  incidents: {
    items: [],
    status: "loading",
  },
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserRequest.pending]: (state) => {
      state.userRequests.items = [];
      state.userRequests.status = "loading";
    },
    [fetchUserRequest.fulfilled]: (state, action) => {
      state.userRequests.items = action.payload;
      state.userRequests.status = "loaded";
    },
    [fetchUserRequest.rejected]: (state) => {
      state.userRequests.items = [];
      state.userRequests.status = "error";
    },
  },
});

export const ticketsReducer = ticketsSlice.reducer;
