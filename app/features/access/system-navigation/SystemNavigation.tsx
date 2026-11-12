"use client";

import type { NullableRef } from "@/app/types";
import SystemNavigationItems from "./components/SystemNavigationItems";
import SystemNavigationMenu from "./components/SystemNavigationMenu";
import { SYSTEM_NAVIGATION_COPY } from "./constants/SystemNavigationCopy.constants";
import type { SystemNavigationProps } from "./models/SystemNavigationProps.interface";
import { useSystemNavigationViewModel } from "./hooks/useSystemNavigationViewModel";
import { SYSTEM_NAVIGATION_CLASS } from "./styles/SystemNavigation.styles";

const SystemNavigation = ({
  menuExtras,
  menuIdentity,
  overview,
}: SystemNavigationProps): NullableRef<React.JSX.Element> => {
  const [viewModel, navigationRef] =
    useSystemNavigationViewModel(overview);

  if (!viewModel.canShowNavigation) {
    return null;
  }

  return (
    <div ref={navigationRef}>
      <nav
        aria-label={SYSTEM_NAVIGATION_COPY.LABEL}
        className={SYSTEM_NAVIGATION_CLASS}
      >
        <SystemNavigationItems
          items={viewModel.items}
          pathname={viewModel.pathname}
          isMenuOpen={viewModel.isMenuOpen}
          toggleMenu={viewModel.toggleMenu}
          showMenuButton={viewModel.showMenuButton}
        />
      </nav>
      <SystemNavigationMenu
        extras={menuExtras}
        identity={menuIdentity}
        isOpen={viewModel.isMenuOpen}
        canChangeMode={viewModel.canChangeMode}
        closeMenu={viewModel.closeMenu}
      />
    </div>
  );
};

export default SystemNavigation;
