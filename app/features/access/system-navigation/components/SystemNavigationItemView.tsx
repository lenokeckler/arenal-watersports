import { Link } from "@/app/components";
import { ARIA_CURRENT } from "@/app/constants";
import type { SystemNavigationItemViewProps } from "../models/SystemNavigationItemViewProps.interface";
import { resolveSystemNavigationItemClassName } from "../styles/SystemNavigation.styles";
import { isSystemNavigationPathCurrent } from "../utils/isSystemNavigationPathCurrent";
import SystemNavigationItemLabel from "./SystemNavigationItemLabel";

const SystemNavigationItemView = ({
  item,
  pathname,
}: SystemNavigationItemViewProps): React.JSX.Element => {
  const isCurrent = isSystemNavigationPathCurrent(
    item.href,
    pathname
  );
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
