import type { SystemNavigationMenuDestination } from "./SystemNavigationMenuDestination.interface";

export interface SystemNavigationMenuSection {
  label: string;
  destinations: readonly SystemNavigationMenuDestination[];
}
