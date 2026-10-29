import { ReactNode } from "react";
import type { SessionConfigType } from "@/app/constants";

export interface LayoutSessionProviderProps {
  children: ReactNode;
  configType: SessionConfigType;
}
