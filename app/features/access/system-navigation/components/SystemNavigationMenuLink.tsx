import { Link } from "@/app/components";
import type { SystemNavigationMenuLinkProps } from "../models/SystemNavigationMenuLinkProps.interface";
import { SYSTEM_NAVIGATION_MENU_LINK_CLASS } from "../styles/SystemNavigation.styles";

const SystemNavigationMenuLink = ({
  href,
  label,
  onNavigate,
}: SystemNavigationMenuLinkProps): React.JSX.Element => (
  <Link
    href={href}
    className={SYSTEM_NAVIGATION_MENU_LINK_CLASS}
    onClick={onNavigate}
  >
    {label}
  </Link>
);

export default SystemNavigationMenuLink;
