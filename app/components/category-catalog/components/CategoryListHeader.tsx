import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  IMAGE_ALTS,
} from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";

const CategoryListHeader = (): React.JSX.Element => (
  <ScreenHeading
    title={CATEGORY_CATALOG_COPY.LIST_TITLE}
    titleId={ADMINISTRATION_SCREEN_TITLE_ID}
    logoAlt={IMAGE_ALTS.COMPANY_LOGO}
    instruction={CATEGORY_CATALOG_COPY.LIST_PURPOSE}
  />
);

export default CategoryListHeader;
