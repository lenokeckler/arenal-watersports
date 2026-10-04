import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_CREATE_FORM_TITLE_ID } from "../constants/CategoryCreateFormTitleId.constants";
import { CATEGORY_LIST_HEADER_TITLE_CLASS } from "../styles/CategoryListHeader.styles";

const CategoryCreateFormHeader = (): React.JSX.Element => (
  <Title
    id={CATEGORY_CREATE_FORM_TITLE_ID}
    variant={TitleVariant.PRIMARY}
    text={CATEGORY_CATALOG_COPY.CREATE_FORM_TITLE}
    className={CATEGORY_LIST_HEADER_TITLE_CLASS}
  />
);

export default CategoryCreateFormHeader;
