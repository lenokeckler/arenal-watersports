import EditIcon from "@/app/components/icons/edit/EditIcon";
import InlineText from "@/app/components/text/InlineText";
import { CATEGORY_CARD_ICON_COLOR } from "../constants/CategoryCardIconColor.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import {
  CATEGORY_CARD_EDIT_LABEL_CLASS,
  CATEGORY_CARD_EDIT_LABEL_ICON_CLASS,
} from "../styles/CategoryCardEditLabel.styles";

const CategoryCardEditLabel = (): React.JSX.Element => (
  <InlineText className={CATEGORY_CARD_EDIT_LABEL_CLASS}>
    <EditIcon
      className={CATEGORY_CARD_EDIT_LABEL_ICON_CLASS}
      color={CATEGORY_CARD_ICON_COLOR}
    />
    {CATEGORY_CATALOG_COPY.EDIT_BUTTON}
  </InlineText>
);

export default CategoryCardEditLabel;
