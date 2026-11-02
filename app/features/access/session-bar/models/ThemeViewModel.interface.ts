import type { Theme } from "@/app/constants";

export interface ThemeViewModel {
  theme: Theme;
  handleToggle: () => void;
}
