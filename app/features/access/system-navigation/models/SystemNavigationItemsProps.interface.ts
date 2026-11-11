import type { SystemNavigationItem } from "./SystemNavigationItem.interface";

export interface SystemNavigationItemsProps {
  items: readonly SystemNavigationItem[];
  pathname: string;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  showMenuButton: boolean;
}
