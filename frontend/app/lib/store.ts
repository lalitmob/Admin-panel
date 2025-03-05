import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import triggerReducer from "./features/Model/triggerSlice";
import userReducer from "./features/Model/user.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "trigger"], // ✅ Only persist selected reducers
  version: 1, 
};

const rootReducer = combineReducers({
  trigger: triggerReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // ✅ Prevents JSON double-stringification
      }),
  });

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
