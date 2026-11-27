import {
  Button,
  MaterialIcon,
  Text,
} from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import {
  ARIA_ROLE,
  BUTTON,
  BUTTON_TYPES,
} from "@/app/constants";
import { SYSTEM_NAVIGATION_COPY } from "../constants/SystemNavigationCopy.constants";
import { SYSTEM_NAVIGATION_MENU_ID } from "../constants/SystemNavigationMenu.constants";
import type { SystemNavigationMenuProps } from "../models/SystemNavigationMenuProps.interface";
import {
  SYSTEM_NAVIGATION_MENU_BACKDROP_CLASS,
  SYSTEM_NAVIGATION_MENU_BODY_CLASS,
  SYSTEM_NAVIGATION_MENU_CLOSE_CLASS,
  SYSTEM_NAVIGATION_MENU_HEADER_CLASS,
  SYSTEM_NAVIGATION_MENU_TITLE_CLASS,
  resolveSystemNavigationMenuClassName,
} from "../styles/SystemNavigation.styles";
import SystemNavigationMenuIdentityCard from "./SystemNavigationMenuIdentityCard";
import SystemNavigationMenuSection from "./SystemNavigationMenuSection";

const SystemNavigationMenu = ({
  sections,
  extras,
  identity,
  isOpen,
  pathname,
  closeMenu,
}: SystemNavigationMenuProps): React.JSX.Element => (
  <>
    {isOpen ? (
      <div
        aria-hidden="true"
        className={SYSTEM_NAVIGATION_MENU_BACKDROP_CLASS}
      />
    ) : null}
    <div
      id={SYSTEM_NAVIGATION_MENU_ID}
      className={resolveSystemNavigationMenuClassName(
        isOpen
      )}
      role={ARIA_ROLE.REGION}
      aria-label={SYSTEM_NAVIGATION_COPY.MENU_LABEL}
      hidden={!isOpen}
    >
      <div className={SYSTEM_NAVIGATION_MENU_HEADER_CLASS}>
        <Text
          className={SYSTEM_NAVIGATION_MENU_TITLE_CLASS}
        >
          {SYSTEM_NAVIGATION_COPY.MENU}
        </Text>
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON.BASE}
          aria-label={SYSTEM_NAVIGATION_COPY.CLOSE_MENU}
          className={SYSTEM_NAVIGATION_MENU_CLOSE_CLASS}
          onClick={closeMenu}
        >
          <MaterialIcon name={MATERIAL_ICON_NAME.CLOSE} />
        </Button>
      </div>
      <div className={SYSTEM_NAVIGATION_MENU_BODY_CLASS}>
        {identity ? (
          <SystemNavigationMenuIdentityCard
            identity={identity}
          />
        ) : null}
        {sections.map((section) => (
          <SystemNavigationMenuSection
            key={section.label}
            section={section}
            pathname={pathname}
            onNavigate={closeMenu}
          />
        ))}
        {extras}
      </div>
    </div>
  </>
);

export default SystemNavigationMenu;
