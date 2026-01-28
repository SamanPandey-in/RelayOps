// redux store configuration
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import workspaceReducer from "./slices/workspaceSlice";
import settingsReducer from "./slices/settingsSlice";
import { apiSlice } from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    workspace: workspaceReducer,
    settings: settingsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  
  // Optional: enable Redux DevTools automatically in dev
  devTools: import.meta.env.DEV,
});

export default store;