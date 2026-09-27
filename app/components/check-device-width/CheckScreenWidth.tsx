"use client";
import React, { createContext, useContext } from "react";
import { CheckScreenWidthContext } from "./CheckScreenWidthContext.interface";
import { useWidthSize } from "./hooks/useWidthSize";

const CheckDeviceWidth =
  createContext<CheckScreenWidthContext | null>(null);

export const CheckDeviceWidth_Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isMobile } = useWidthSize();

  return React.createElement(
    CheckDeviceWidth.Provider,
    { value: { isMobile } },
    children
  );
};

export const useCheckDeviceWidth =
  (): CheckScreenWidthContext =>
    useContext(CheckDeviceWidth) as CheckScreenWidthContext;
