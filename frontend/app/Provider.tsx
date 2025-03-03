"use client";

import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./lib/store";
import StoreProvider from "./StoreProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </StoreProvider>
  );
}
