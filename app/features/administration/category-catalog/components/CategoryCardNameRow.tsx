import InlineText from "@/app/components/text/InlineText";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryCardNameRowProps } from "../models/CategoryCardNameRowProps.interface";
import {
  CATEGORY_CARD_NAME_CLASS,
  CATEGORY_CARD_NAME_ROW_CLASS,
  CATEGORY_CARD_STATUS_PILL_CLASS,
} from "../styles/CategoryCard.styles";

const CategoryCardNameRow = ({
  name,
  isInactive,
}: CategoryCardNameRowProps): React.JSX.Element => (
  <div className={CATEGORY_CARD_NAME_ROW_CLASS}>
    <Title
      variant={TitleVariant.AUXILIAR}
      text={name}
      className={CATEGORY_CARD_NAME_CLASS}
    />
    {isInactive && (
      <InlineText
        className={CATEGORY_CARD_STATUS_PILL_CLASS}
      >
        {CATEGORY_CATALOG_COPY.STATUS_PILL_INACTIVE}
      </InlineText>
    )}
  </div>
);

export default CategoryCardNameRow;
