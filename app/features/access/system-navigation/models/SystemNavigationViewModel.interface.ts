import type { SystemNavigationItem } from "./SystemNavigationItem.interface";

export interface SystemNavigationViewModel {
  items: readonly SystemNavigationItem[];
  pathname: string;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  canChangeMode: boolean;
  canShowNavigation: boolean;
  showMenuButton: boolean;
}
