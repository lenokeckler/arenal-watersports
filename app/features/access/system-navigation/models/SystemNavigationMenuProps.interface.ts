import type { SystemNavigationMenuIdentity } from "./SystemNavigationMenuIdentity.interface";

export interface SystemNavigationMenuProps {
  extras?: React.ReactNode;
  identity?: SystemNavigationMenuIdentity | null;
  isOpen: boolean;
  canChangeMode: boolean;
  closeMenu: () => void;
}
