import Link from "@/app/components/link/Link";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { PATHS, TitleVariant } from "@/app/constants";
import { CATEGORY_LIST_TITLE_ID } from "../constants/CategoryListTitleId.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import {
  CATEGORY_LIST_HEADER_CLASS,
  CATEGORY_LIST_HEADER_CREATE_LINK_CLASS,
  CATEGORY_LIST_HEADER_PURPOSE_CLASS,
  CATEGORY_LIST_HEADER_TITLE_CLASS,
} from "../styles/CategoryListHeader.styles";

const CategoryListHeader = (): React.JSX.Element => (
  <div className={CATEGORY_LIST_HEADER_CLASS}>
    <div>
      <Title
        id={CATEGORY_LIST_TITLE_ID}
        variant={TitleVariant.PRIMARY}
        text={CATEGORY_CATALOG_COPY.LIST_TITLE}
        className={CATEGORY_LIST_HEADER_TITLE_CLASS}
      />
      <Text className={CATEGORY_LIST_HEADER_PURPOSE_CLASS}>
        {CATEGORY_CATALOG_COPY.LIST_PURPOSE}
      </Text>
    </div>
    <Link
      href={PATHS.ADMINISTRATION.CATEGORIES_NEW}
      className={CATEGORY_LIST_HEADER_CREATE_LINK_CLASS}
    >
      {CATEGORY_CATALOG_COPY.CREATE_CTA}
    </Link>
  </div>
);

export default CategoryListHeader;
