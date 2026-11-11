import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import { ADMINISTRATION_SCREEN_TITLE_ID } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";

const CategoryCreateFormHeader = (): React.JSX.Element => (
  <ScreenHeading
    title={CATEGORY_CATALOG_COPY.CREATE_FORM_TITLE}
    titleId={ADMINISTRATION_SCREEN_TITLE_ID}
    hasLogo={false}
    instruction={CATEGORY_CATALOG_COPY.CREATE_FORM_PURPOSE}
  />
);

export default CategoryCreateFormHeader;
