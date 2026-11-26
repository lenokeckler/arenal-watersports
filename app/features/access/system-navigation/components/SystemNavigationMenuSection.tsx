import { Text } from "@/app/components";
import type { SystemNavigationMenuSectionProps } from "../models/SystemNavigationMenuSectionProps.interface";
import {
  SYSTEM_NAVIGATION_MENU_SECTION_CLASS,
  SYSTEM_NAVIGATION_MENU_SECTION_LABEL_CLASS,
} from "../styles/SystemNavigation.styles";
import { isSystemNavigationPathCurrent } from "../utils/isSystemNavigationPathCurrent";
import SystemNavigationMenuLink from "./SystemNavigationMenuLink";

const SystemNavigationMenuSection = ({
  section,
  pathname,
  onNavigate,
}: SystemNavigationMenuSectionProps): React.JSX.Element => (
  <nav
    aria-label={section.label}
    className={SYSTEM_NAVIGATION_MENU_SECTION_CLASS}
  >
    <Text
      className={SYSTEM_NAVIGATION_MENU_SECTION_LABEL_CLASS}
    >
      {section.label}
    </Text>
    {section.destinations.map((destination) => (
      <SystemNavigationMenuLink
        key={destination.href}
        destination={destination}
        isCurrent={isSystemNavigationPathCurrent(
          destination.href,
          pathname
        )}
        onNavigate={onNavigate}
      />
    ))}
  </nav>
);

export default SystemNavigationMenuSection;
