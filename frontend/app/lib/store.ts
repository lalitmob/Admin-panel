import { configureStore } from "@reduxjs/toolkit";
import triggerReducer from "./features/Model/triggerSlice"
export const makeStore = () => {
  return configureStore({
    reducer: {
        trigger : triggerReducer
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
