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
  PATHS,
} from "@/app/constants";
import { SYSTEM_NAVIGATION_COPY } from "../constants/SystemNavigationCopy.constants";
import { SYSTEM_NAVIGATION_MENU_ID } from "../constants/SystemNavigationMenu.constants";
import type { SystemNavigationMenuProps } from "../models/SystemNavigationMenuProps.interface";
import {
  SYSTEM_NAVIGATION_MENU_BACKDROP_CLASS,
  SYSTEM_NAVIGATION_MENU_CLOSE_CLASS,
  SYSTEM_NAVIGATION_MENU_HEADER_CLASS,
  SYSTEM_NAVIGATION_MENU_IDENTITY_CLASS,
  SYSTEM_NAVIGATION_MENU_IDENTITY_META_CLASS,
  SYSTEM_NAVIGATION_MENU_IDENTITY_NAME_CLASS,
  SYSTEM_NAVIGATION_MENU_SECTION_LABEL_CLASS,
  SYSTEM_NAVIGATION_MENU_TITLE_CLASS,
  resolveSystemNavigationMenuClassName,
} from "../styles/SystemNavigation.styles";
import SystemNavigationMenuLink from "./SystemNavigationMenuLink";

const SystemNavigationMenu = ({
  extras,
  identity,
  isOpen,
  canChangeMode,
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
      {identity ? (
        <div
          className={SYSTEM_NAVIGATION_MENU_IDENTITY_CLASS}
        >
          <Text
            className={
              SYSTEM_NAVIGATION_MENU_IDENTITY_NAME_CLASS
            }
          >
            {identity.fullName}
          </Text>
          <Text
            className={
              SYSTEM_NAVIGATION_MENU_IDENTITY_META_CLASS
            }
          >
            {`${SYSTEM_NAVIGATION_COPY.USER_PREFIX}: ${identity.username}`}
          </Text>
          <Text
            className={
              SYSTEM_NAVIGATION_MENU_IDENTITY_META_CLASS
            }
          >
            {`${SYSTEM_NAVIGATION_COPY.ROLE_PREFIX}: ${identity.role}`}
          </Text>
        </div>
      ) : null}
      <Text
        className={
          SYSTEM_NAVIGATION_MENU_SECTION_LABEL_CLASS
        }
      >
        {SYSTEM_NAVIGATION_COPY.MORE_OPTIONS}
      </Text>
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
      {extras}
    </div>
  </>
);

export default SystemNavigationMenu;
