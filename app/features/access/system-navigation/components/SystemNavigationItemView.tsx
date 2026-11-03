import { Link } from "@/app/components";
import { ARIA_CURRENT } from "@/app/constants";
import { SYSTEM_NAVIGATION_COPY } from "../constants/SystemNavigationCopy.constants";
import type { SystemNavigationItemViewProps } from "../models/SystemNavigationItemViewProps.interface";
import { resolveSystemNavigationItemClassName } from "../styles/SystemNavigation.styles";
import SystemNavigationItemLabel from "./SystemNavigationItemLabel";

const SystemNavigationItemView = ({
  item,
  pathname,
}: SystemNavigationItemViewProps): React.JSX.Element => {
  const isCurrent = pathname === item.href;
  const className = resolveSystemNavigationItemClassName(
    isCurrent,
    item.disabled
  );
  return item.href ? (
    <Link
      href={item.href}
      className={className}
      ariaCurrent={
        isCurrent ? ARIA_CURRENT.PAGE : undefined
      }
    >
      <SystemNavigationItemLabel item={item} />
    </Link>
  ) : (
    <button
      type="button"
      className={className}
      disabled
      aria-label={SYSTEM_NAVIGATION_COPY.PENDING_LABEL(
        item.label
      )}
    >
      <SystemNavigationItemLabel item={item} />
    </button>
  );
};

export default SystemNavigationItemView;
