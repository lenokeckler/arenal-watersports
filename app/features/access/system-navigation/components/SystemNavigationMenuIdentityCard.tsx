import { InlineText, Text } from "@/app/components";
import type { SystemNavigationMenuIdentityCardProps } from "../models/SystemNavigationMenuIdentityCardProps.interface";
import {
  SYSTEM_NAVIGATION_MENU_AVATAR_CLASS,
  SYSTEM_NAVIGATION_MENU_IDENTITY_CLASS,
  SYSTEM_NAVIGATION_MENU_IDENTITY_META_CLASS,
  SYSTEM_NAVIGATION_MENU_IDENTITY_NAME_CLASS,
  SYSTEM_NAVIGATION_MENU_IDENTITY_TEXT_CLASS,
} from "../styles/SystemNavigation.styles";
import { buildSystemNavigationInitials } from "../utils/buildSystemNavigationInitials";

const SystemNavigationMenuIdentityCard = ({
  identity,
}: SystemNavigationMenuIdentityCardProps): React.JSX.Element => (
  <div className={SYSTEM_NAVIGATION_MENU_IDENTITY_CLASS}>
    <InlineText
      aria-hidden="true"
      className={SYSTEM_NAVIGATION_MENU_AVATAR_CLASS}
    >
      {buildSystemNavigationInitials(identity.fullName)}
    </InlineText>
    <div
      className={SYSTEM_NAVIGATION_MENU_IDENTITY_TEXT_CLASS}
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
        {identity.role}
      </Text>
    </div>
  </div>
);

export default SystemNavigationMenuIdentityCard;
