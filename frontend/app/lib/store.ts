import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import triggerReducer from "./features/Model/triggerSlice";
import userReducer from "./features/Model/user.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "trigger"],
  serialize: false, // ✅ Prevents JSON double-stringification
};

const rootReducer = combineReducers({
  trigger: triggerReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // ✅ Apply persist to rootReducer

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer, // ✅ Corrected usage
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
