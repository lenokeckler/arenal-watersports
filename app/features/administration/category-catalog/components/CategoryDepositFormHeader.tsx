import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import { ADMINISTRATION_SCREEN_TITLE_ID } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_DEPOSIT_FORM_FIELD_ID } from "../constants/CategoryDepositFormFieldId.constants";

const CategoryDepositFormHeader = (): React.JSX.Element => (
  <ScreenHeading
    title={CATEGORY_CATALOG_COPY.DEPOSIT_FORM_TITLE}
    titleId={ADMINISTRATION_SCREEN_TITLE_ID}
    hasLogo={false}
    instruction={CATEGORY_CATALOG_COPY.DEPOSIT_FORM_HINT}
    instructionId={CATEGORY_DEPOSIT_FORM_FIELD_ID.HINT}
  />
);

export default CategoryDepositFormHeader;
