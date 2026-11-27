import type { SystemNavigationMenuDestination } from "./SystemNavigationMenuDestination.interface";

export interface SystemNavigationMenuLinkProps {
  destination: SystemNavigationMenuDestination;
  isCurrent: boolean;
  onNavigate: () => void;
}
