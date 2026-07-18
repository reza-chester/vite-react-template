import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./Reducers/tokenSlice";
import { persistReducer } from "redux-persist";
import menuSlice from "./Reducers/menuSlice";
import themeSlice from "./Reducers/themeSlice";
import fileUploadSlice from "./Reducers/fileUploadSlice";
import adminAccessSlice from "./Reducers/adminAccessSlice";
import userLevelAccessSlice from "./Reducers/userLevelAccessSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const reducers = combineReducers({
  token: tokenSlice,
  menu: menuSlice,
  theme: themeSlice,
  fileUpload: fileUploadSlice,
  adminAccess: adminAccessSlice,
  levelAccess: userLevelAccessSlice
});
const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "menu",
    "fileUpload",
    "theme",
    "adminAccess",
    "levelAccess",
    "error",
    "load",
    "userPageAccess",
    "userTypeLevel2Access"
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
