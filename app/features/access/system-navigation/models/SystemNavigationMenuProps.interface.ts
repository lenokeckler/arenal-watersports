import type { SystemNavigationMenuDestination } from "./SystemNavigationMenuDestination.interface";
import type { SystemNavigationMenuIdentity } from "./SystemNavigationMenuIdentity.interface";

export interface SystemNavigationMenuProps {
  destinations: readonly SystemNavigationMenuDestination[];
  extras?: React.ReactNode;
  identity?: SystemNavigationMenuIdentity | null;
  isOpen: boolean;
  canChangeMode: boolean;
  closeMenu: () => void;
}
