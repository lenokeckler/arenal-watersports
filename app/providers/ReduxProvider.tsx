"use client";

import { Provider } from "react-redux";
import { store } from "@/app/store";
import { ReactNode } from "react";

interface ReduxProviderProps {
  children: ReactNode;
}

export const ReduxProvider = ({
  children,
}: ReduxProviderProps) => (
  <Provider store={store}>{children}</Provider>
);
