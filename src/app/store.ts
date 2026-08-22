import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./Reducers/tokenSlice";
import { persistReducer } from "redux-persist";
import menuSlice from "./Reducers/menuSlice";
import themeSlice from "./Reducers/themeSlice";
import fileUploadSlice from "./Reducers/fileUploadSlice";
import adminAccessSlice from "./Reducers/adminAccessSlice";
import userProfileSlice  from "./Reducers/userProfileSlice";
import storageModule from "redux-persist/lib/storage";
import modalSlice from "./Reducers/modalSlice";
import lightboxSlice from "./Reducers/lightboxSlice";

const storage =
  "default" in storageModule
    ? storageModule.default
    : storageModule;


// import.meta.env.DEV      // true در npm run dev
// import.meta.env.PROD    
// import.meta.env.MODE     // "development" | "production"
const reducers = combineReducers({
  token: tokenSlice,
  menu: menuSlice,
  theme: themeSlice,
  fileUpload: fileUploadSlice,
  adminAccess: adminAccessSlice,
  userProfile:userProfileSlice,
  modal:modalSlice,
  lightbox:lightboxSlice

});
const persistConfig = {
  key: "process-hub",
  storage,
  blacklist: [
    "menu",
    "modal",
    "fileUpload",
    "theme",
    "adminAccess",
    "userProfile",
    "lightbox"
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.MODE !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

