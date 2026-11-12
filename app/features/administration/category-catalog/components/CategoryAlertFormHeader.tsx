import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import { ADMINISTRATION_SCREEN_TITLE_ID } from "@/app/constants";
import { CATEGORY_ALERT_FORM_FIELD_ID } from "../constants/CategoryAlertFormFieldId.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";

const CategoryAlertFormHeader = (): React.JSX.Element => (
  <ScreenHeading
    title={CATEGORY_CATALOG_COPY.ALERT_FORM_TITLE}
    titleId={ADMINISTRATION_SCREEN_TITLE_ID}
    hasLogo={false}
    instruction={CATEGORY_CATALOG_COPY.ALERT_FORM_HINT}
    instructionId={CATEGORY_ALERT_FORM_FIELD_ID.HINT}
  />
);

export default CategoryAlertFormHeader;
