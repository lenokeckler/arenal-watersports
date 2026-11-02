import type { LogoutViewModel } from "./LogoutViewModel.interface";
import type { ThemeViewModel } from "./ThemeViewModel.interface";

export interface SessionBarViewProps
  extends LogoutViewModel, ThemeViewModel {}
