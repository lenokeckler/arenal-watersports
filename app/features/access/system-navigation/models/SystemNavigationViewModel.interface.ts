import type { SystemNavigationItem } from "./SystemNavigationItem.interface";
import type { SystemNavigationMenuDestination } from "./SystemNavigationMenuDestination.interface";

export interface SystemNavigationViewModel {
  items: readonly SystemNavigationItem[];
  menuItems: readonly SystemNavigationMenuDestination[];
  pathname: string;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  canChangeMode: boolean;
  canShowNavigation: boolean;
  showMenuButton: boolean;
}
