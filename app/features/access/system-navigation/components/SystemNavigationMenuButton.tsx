import {
  Button,
  InlineText,
  MaterialIcon,
} from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { BUTTON } from "@/app/constants";
import { SYSTEM_NAVIGATION_COPY } from "../constants/SystemNavigationCopy.constants";
import { SYSTEM_NAVIGATION_MENU_ID } from "../constants/SystemNavigationMenu.constants";
import type { SystemNavigationMenuButtonProps } from "../models/SystemNavigationMenuButtonProps.interface";
import {
  SYSTEM_NAVIGATION_ICON_CLASS,
  SYSTEM_NAVIGATION_LABEL_CLASS,
  resolveSystemNavigationItemClassName,
} from "../styles/SystemNavigation.styles";

const SystemNavigationMenuButton = ({
  isOpen,
  onToggle,
}: SystemNavigationMenuButtonProps): React.JSX.Element => (
  <Button
    variant={BUTTON.BASE}
    type="button"
    className={resolveSystemNavigationItemClassName(false)}
    aria-expanded={isOpen}
    aria-controls={SYSTEM_NAVIGATION_MENU_ID}
    onClick={onToggle}
  >
    <MaterialIcon
      name={MATERIAL_ICON_NAME.MENU}
      className={SYSTEM_NAVIGATION_ICON_CLASS}
    />
    <InlineText className={SYSTEM_NAVIGATION_LABEL_CLASS}>
      {SYSTEM_NAVIGATION_COPY.MENU}
    </InlineText>
  </Button>
);

export default SystemNavigationMenuButton;
