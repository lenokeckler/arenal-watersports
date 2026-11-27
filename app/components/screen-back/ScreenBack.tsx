"use client";

import Link from "../link/Link";
import MaterialIcon from "../icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "../icons/material-icon/constants/MaterialIconName.constants";
import { SCREEN_BACK_COPY } from "./constants/ScreenBackCopy.constants";
import { useScreenBack } from "./hooks/useScreenBack";
import type { ScreenBackProps } from "./models/ScreenBackProps.interface";
import { SCREEN_BACK_CLASS } from "./styles/ScreenBack.styles";

const ScreenBack = ({
  fallbackHref,
}: ScreenBackProps): React.JSX.Element => {
  const { handleBack } = useScreenBack();

  return (
    <Link
      href={fallbackHref}
      className={SCREEN_BACK_CLASS}
      onClick={handleBack}
    >
      <MaterialIcon name={MATERIAL_ICON_NAME.ARROW_BACK} />
      {SCREEN_BACK_COPY.LABEL}
    </Link>
  );
};

export default ScreenBack;
