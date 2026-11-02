import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  IMAGE_ALTS,
  STRING,
} from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_TRACKING_MODE_LABEL } from "../constants/CategoryTrackingModeLabel.constants";
import type { CategoryBehaviorFormHeaderProps } from "../models/CategoryBehaviorFormHeaderProps.interface";

const CategoryBehaviorFormHeader = ({
  trackingMode,
}: CategoryBehaviorFormHeaderProps): React.JSX.Element => (
  <ScreenHeading
    title={CATEGORY_CATALOG_COPY.BEHAVIOR_FORM_TITLE}
    titleId={ADMINISTRATION_SCREEN_TITLE_ID}
    logoAlt={IMAGE_ALTS.COMPANY_LOGO}
    instruction={`${CATEGORY_CATALOG_COPY.BEHAVIOR_TRACKING_MODE_LINE_LABEL}${STRING.SPACE}${CATEGORY_TRACKING_MODE_LABEL[trackingMode]}`}
  />
);

export default CategoryBehaviorFormHeader;
