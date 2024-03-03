import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/es/storage";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const appReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: appReducer,
});
export const persistor = persistStore(store);

export const cartState = (state) => state.cart;
