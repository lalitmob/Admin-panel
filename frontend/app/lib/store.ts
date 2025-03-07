import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "@/utils/storage"; 
import triggerReducer from "./features/Model/triggerSlice";
import userReducer from "./features/Model/user.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "trigger"],
  version: 1, 
};

const rootReducer = combineReducers({
  trigger: triggerReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
