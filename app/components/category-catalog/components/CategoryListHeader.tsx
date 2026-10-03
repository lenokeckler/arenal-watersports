import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  BUTTON,
  SIZE,
  TitleVariant,
} from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryListCreateCtaProps } from "../models/CategoryListCreateCtaProps.interface";
import {
  CATEGORY_LIST_HEADER_CLASS,
  CATEGORY_LIST_HEADER_CTA_BUTTON_CLASS,
  CATEGORY_LIST_HEADER_CTA_WRAPPER_CLASS,
  CATEGORY_LIST_HEADER_PURPOSE_CLASS,
  CATEGORY_LIST_HEADER_TITLE_CLASS,
} from "../styles/CategoryListHeader.styles";

const CategoryListHeader = ({
  onCreateCategory,
}: CategoryListCreateCtaProps): React.JSX.Element => (
  <div className={CATEGORY_LIST_HEADER_CLASS}>
    <div>
      <Title
        variant={TitleVariant.PRIMARY}
        text={CATEGORY_CATALOG_COPY.LIST_TITLE}
        className={CATEGORY_LIST_HEADER_TITLE_CLASS}
      />
      <Text className={CATEGORY_LIST_HEADER_PURPOSE_CLASS}>
        {CATEGORY_CATALOG_COPY.LIST_PURPOSE}
      </Text>
    </div>
    <div className={CATEGORY_LIST_HEADER_CTA_WRAPPER_CLASS}>
      <Button
        variant={BUTTON.PRIMARY}
        size={SIZE.MD}
        onClick={onCreateCategory}
        className={CATEGORY_LIST_HEADER_CTA_BUTTON_CLASS}
      >
        {CATEGORY_CATALOG_COPY.CREATE_CTA}
      </Button>
    </div>
  </div>
);

export default CategoryListHeader;
