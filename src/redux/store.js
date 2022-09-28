import { configureStore } from "@reduxjs/toolkit";
import { ticketsReducer } from "./slices/tickets";
import { authReducer } from "./slices/login";

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    auth: authReducer,
  },
});

export default store;
