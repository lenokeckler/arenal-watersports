import type { SystemNavigationMenuIdentity } from "./SystemNavigationMenuIdentity.interface";
import type { SystemNavigationMenuSection } from "./SystemNavigationMenuSection.interface";

export interface SystemNavigationMenuProps {
  sections: readonly SystemNavigationMenuSection[];
  extras?: React.ReactNode;
  identity?: SystemNavigationMenuIdentity | null;
  isOpen: boolean;
  pathname: string;
  closeMenu: () => void;
}
