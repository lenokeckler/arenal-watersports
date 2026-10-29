"use client";

import { SESSION_CONFIG_TYPES } from "@/app/constants";
import LayoutSessionProvider from "./LayoutSessionProvider";
import { AdminSessionProviderProps } from "./models/AdminSessionProviderProps.interface";

const AdminSessionProvider = ({
  children,
}: AdminSessionProviderProps) => (
  <LayoutSessionProvider
    configType={SESSION_CONFIG_TYPES.ADMIN}
  >
    {children}
  </LayoutSessionProvider>
);

export default AdminSessionProvider;
