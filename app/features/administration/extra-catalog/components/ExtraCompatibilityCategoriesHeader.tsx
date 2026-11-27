import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import { ADMINISTRATION_SCREEN_TITLE_ID } from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import type { ExtraCompatibilityCategoriesHeaderProps } from "../models/ExtraCompatibilityCategoriesHeaderProps.interface";

const ExtraCompatibilityCategoriesHeader = ({
  extraName,
}: ExtraCompatibilityCategoriesHeaderProps): React.JSX.Element => (
  <ScreenHeading
    title={EXTRA_COMPATIBILITY_COPY.CATEGORIES_TITLE}
    titleId={ADMINISTRATION_SCREEN_TITLE_ID}
    hasLogo={false}
    instruction={EXTRA_COMPATIBILITY_COPY.CATEGORIES_INSTRUCTION(
      extraName
    )}
  />
);

export default ExtraCompatibilityCategoriesHeader;
