import type { SystemNavigationMenuSection } from "./SystemNavigationMenuSection.interface";

export interface SystemNavigationMenuSectionProps {
  section: SystemNavigationMenuSection;
  pathname: string;
  onNavigate: () => void;
}
