import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import { ADMINISTRATION_SCREEN_TITLE_ID } from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import type { ExtraCompatibilityUnitsHeaderProps } from "../models/ExtraCompatibilityUnitsHeaderProps.interface";

const ExtraCompatibilityUnitsHeader = ({
  categoryName,
  extraName,
}: ExtraCompatibilityUnitsHeaderProps): React.JSX.Element => (
  <ScreenHeading
    title={EXTRA_COMPATIBILITY_COPY.UNITS_TITLE}
    titleId={ADMINISTRATION_SCREEN_TITLE_ID}
    hasLogo={false}
    instruction={EXTRA_COMPATIBILITY_COPY.UNITS_INSTRUCTION(
      extraName,
      categoryName
    )}
  />
);

export default ExtraCompatibilityUnitsHeader;
