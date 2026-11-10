import { Link } from "@/app/components";
import {
  ARIA_CURRENT,
  PATHS,
  STRING,
} from "@/app/constants";
import type { SystemNavigationItemViewProps } from "../models/SystemNavigationItemViewProps.interface";
import { resolveSystemNavigationItemClassName } from "../styles/SystemNavigation.styles";
import SystemNavigationItemLabel from "./SystemNavigationItemLabel";

const SystemNavigationItemView = ({
  item,
  pathname,
}: SystemNavigationItemViewProps): React.JSX.Element => {
  const isCurrent =
    (item.href === PATHS.BOARD &&
      pathname === PATHS.HOME) ||
    pathname === item.href ||
    pathname.startsWith(`${item.href}${STRING.SLASH}`);
  const className =
    resolveSystemNavigationItemClassName(isCurrent);

  return (
    <Link
      href={item.href}
      className={className}
      ariaCurrent={
        isCurrent ? ARIA_CURRENT.PAGE : undefined
      }
    >
      <SystemNavigationItemLabel item={item} />
    </Link>
  );
};

export default SystemNavigationItemView;
