"use client";
import { useState,useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./lib/store";
import StoreProvider from "./StoreProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <StoreProvider>
      {isClient ? (
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      ) : null}
    </StoreProvider>
  );
}
