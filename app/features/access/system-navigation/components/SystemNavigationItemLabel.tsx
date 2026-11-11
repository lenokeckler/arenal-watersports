import { InlineText, MaterialIcon } from "@/app/components";
import type { SystemNavigationItemLabelProps } from "../models/SystemNavigationItemLabelProps.interface";
import {
  SYSTEM_NAVIGATION_ICON_CLASS,
  SYSTEM_NAVIGATION_LABEL_CLASS,
} from "../styles/SystemNavigation.styles";

const SystemNavigationItemLabel = ({
  item,
}: SystemNavigationItemLabelProps): React.JSX.Element => (
  <>
    <MaterialIcon
      name={item.icon}
      className={SYSTEM_NAVIGATION_ICON_CLASS}
    />
    <InlineText className={SYSTEM_NAVIGATION_LABEL_CLASS}>
      {item.label}
    </InlineText>
  </>
);

export default SystemNavigationItemLabel;
