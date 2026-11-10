"use client";

import type { SystemScreenProps } from "./models/SystemScreenProps.interface";
import { useSystemScreenViewModel } from "./hooks/useSystemScreenViewModel";
import { resolveSystemScreenClassName } from "./styles/SystemScreen.styles";

const SystemScreen = ({
  children,
  overview,
}: SystemScreenProps): React.JSX.Element => {
  const viewModel = useSystemScreenViewModel(overview);

  return (
    <div
      className={resolveSystemScreenClassName(
        viewModel.hasBottomNavigation
      )}
    >
      {children}
    </div>
  );
};

export default SystemScreen;
