import { ARIA_ROLE, PATHS } from "@/app/constants";
import { SYSTEM_NAVIGATION_COPY } from "../constants/SystemNavigationCopy.constants";
import { SYSTEM_NAVIGATION_MENU_ID } from "../constants/SystemNavigationMenu.constants";
import type { SystemNavigationMenuProps } from "../models/SystemNavigationMenuProps.interface";
import { resolveSystemNavigationMenuClassName } from "../styles/SystemNavigation.styles";
import SystemNavigationMenuLink from "./SystemNavigationMenuLink";

const SystemNavigationMenu = ({
  isOpen,
  canChangeMode,
  closeMenu,
}: SystemNavigationMenuProps): React.JSX.Element => (
  <div
    id={SYSTEM_NAVIGATION_MENU_ID}
    className={resolveSystemNavigationMenuClassName(isOpen)}
    role={ARIA_ROLE.REGION}
    aria-label={SYSTEM_NAVIGATION_COPY.MENU_LABEL}
    hidden={!isOpen}
  >
    <SystemNavigationMenuLink
      href={PATHS.PROFILE.ROOT}
      label={SYSTEM_NAVIGATION_COPY.PROFILE}
      onNavigate={closeMenu}
    />
    {canChangeMode ? (
      <SystemNavigationMenuLink
        href={PATHS.MODE}
        label={SYSTEM_NAVIGATION_COPY.CHANGE_MODE}
        onNavigate={closeMenu}
      />
    ) : null}
  </div>
);

export default SystemNavigationMenu;
