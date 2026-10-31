import Link from "@/app/components/link/Link";
import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  IMAGE_ALTS,
  PATHS,
} from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import {
  CATEGORY_LIST_HEADER_CLASS,
  CATEGORY_LIST_HEADER_CREATE_LINK_CLASS,
} from "../styles/CategoryListHeader.styles";

const CategoryListHeader = (): React.JSX.Element => (
  <div className={CATEGORY_LIST_HEADER_CLASS}>
    <ScreenHeading
      title={CATEGORY_CATALOG_COPY.LIST_TITLE}
      titleId={ADMINISTRATION_SCREEN_TITLE_ID}
      logoAlt={IMAGE_ALTS.COMPANY_LOGO}
      instruction={CATEGORY_CATALOG_COPY.LIST_PURPOSE}
    />
    <Link
      href={PATHS.ADMINISTRATION.CATEGORIES_NEW}
      className={CATEGORY_LIST_HEADER_CREATE_LINK_CLASS}
    >
      {CATEGORY_CATALOG_COPY.CREATE_CTA}
    </Link>
  </div>
);

export default CategoryListHeader;
