import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { STRING, TitleVariant } from "@/app/constants";
import { CATEGORY_BEHAVIOR_FORM_TITLE_ID } from "../constants/CategoryBehaviorFormTitleId.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_TRACKING_MODE_LABEL } from "../constants/CategoryTrackingModeLabel.constants";
import type { CategoryBehaviorFormHeaderProps } from "../models/CategoryBehaviorFormHeaderProps.interface";
import { CATEGORY_BEHAVIOR_FORM_HEADER_CLASS } from "../styles/CategoryBehaviorFormHeader.styles";
import {
  CATEGORY_LIST_HEADER_PURPOSE_CLASS,
  CATEGORY_LIST_HEADER_TITLE_CLASS,
} from "../styles/CategoryListHeader.styles";

const CategoryBehaviorFormHeader = ({
  trackingMode,
}: CategoryBehaviorFormHeaderProps): React.JSX.Element => (
  <div className={CATEGORY_BEHAVIOR_FORM_HEADER_CLASS}>
    <Title
      id={CATEGORY_BEHAVIOR_FORM_TITLE_ID}
      variant={TitleVariant.PRIMARY}
      text={CATEGORY_CATALOG_COPY.BEHAVIOR_FORM_TITLE}
      className={CATEGORY_LIST_HEADER_TITLE_CLASS}
    />
    <Text className={CATEGORY_LIST_HEADER_PURPOSE_CLASS}>
      {`${CATEGORY_CATALOG_COPY.BEHAVIOR_TRACKING_MODE_LINE_LABEL}${STRING.SPACE}${CATEGORY_TRACKING_MODE_LABEL[trackingMode]}`}
    </Text>
  </div>
);

export default CategoryBehaviorFormHeader;
