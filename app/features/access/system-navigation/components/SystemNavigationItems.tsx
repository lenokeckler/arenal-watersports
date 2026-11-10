import type { SystemNavigationItemsProps } from "../models/SystemNavigationItemsProps.interface";
import { SYSTEM_NAVIGATION_LIST_CLASS } from "../styles/SystemNavigation.styles";
import SystemNavigationItemView from "./SystemNavigationItemView";
import SystemNavigationMenuButton from "./SystemNavigationMenuButton";

const SystemNavigationItems = ({
  items,
  pathname,
  isMenuOpen,
  toggleMenu,
  showMenuButton,
}: SystemNavigationItemsProps): React.JSX.Element => (
  <div className={SYSTEM_NAVIGATION_LIST_CLASS}>
    {items.map((item) => (
      <SystemNavigationItemView
        key={item.label}
        item={item}
        pathname={pathname}
      />
    ))}
    {showMenuButton ? (
      <SystemNavigationMenuButton
        isOpen={isMenuOpen}
        onToggle={toggleMenu}
      />
    ) : null}
  </div>
);

export default SystemNavigationItems;
