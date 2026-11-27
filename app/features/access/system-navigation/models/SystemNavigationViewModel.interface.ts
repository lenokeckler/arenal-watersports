import type { SystemNavigationItem } from "./SystemNavigationItem.interface";
import type { SystemNavigationMenuSection } from "./SystemNavigationMenuSection.interface";

export interface SystemNavigationViewModel {
  items: readonly SystemNavigationItem[];
  menuSections: readonly SystemNavigationMenuSection[];
  pathname: string;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  canChangeMode: boolean;
  canShowNavigation: boolean;
  showMenuButton: boolean;
}
