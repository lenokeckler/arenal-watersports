"use client";

import { SESSION_CONFIG_TYPES } from "@/app/constants";
import LayoutSessionProvider from "./LayoutSessionProvider";
import { ClientSessionProviderProps } from "./models/ClientSessionProviderProps.interface";

const ClientSessionProvider = ({
  children,
}: ClientSessionProviderProps) => (
  <LayoutSessionProvider
    configType={SESSION_CONFIG_TYPES.CLIENT}
  >
    {children}
  </LayoutSessionProvider>
);

export default ClientSessionProvider;
