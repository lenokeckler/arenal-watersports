import {
  InlineText,
  Link,
  MaterialIcon,
} from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { ARIA_CURRENT } from "@/app/constants";
import type { SystemNavigationMenuLinkProps } from "../models/SystemNavigationMenuLinkProps.interface";
import {
  SYSTEM_NAVIGATION_MENU_LINK_CHEVRON_CLASS,
  SYSTEM_NAVIGATION_MENU_LINK_ICON_CLASS,
  SYSTEM_NAVIGATION_MENU_LINK_LABEL_CLASS,
  resolveSystemNavigationMenuLinkClassName,
} from "../styles/SystemNavigation.styles";

const SystemNavigationMenuLink = ({
  destination,
  isCurrent,
  onNavigate,
}: SystemNavigationMenuLinkProps): React.JSX.Element => (
  <Link
    href={destination.href}
    className={resolveSystemNavigationMenuLinkClassName(
      isCurrent
    )}
    ariaCurrent={isCurrent ? ARIA_CURRENT.PAGE : undefined}
    onClick={onNavigate}
  >
    <MaterialIcon
      name={destination.icon}
      className={SYSTEM_NAVIGATION_MENU_LINK_ICON_CLASS}
    />
    <InlineText
      className={SYSTEM_NAVIGATION_MENU_LINK_LABEL_CLASS}
    >
      {destination.label}
    </InlineText>
    <MaterialIcon
      name={MATERIAL_ICON_NAME.CHEVRON_RIGHT}
      className={SYSTEM_NAVIGATION_MENU_LINK_CHEVRON_CLASS}
    />
  </Link>
);

export default SystemNavigationMenuLink;
