import Button from "@/app/components/button/Button";
import EditIcon from "@/app/components/icons/edit/EditIcon";
import { BUTTON } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_CARD_ICON_COLOR } from "../constants/CategoryCardIconColor.constants";
import type { CategoryCardEditButtonProps } from "../models/CategoryCardEditButtonProps.interface";
import {
  CATEGORY_CARD_EDIT_BUTTON_CLASS,
  CATEGORY_CARD_EDIT_ICON_CLASS,
} from "../styles/CategoryCardEditButton.styles";

const CategoryCardEditButton = ({
  isOpen,
  onClick,
  panelId,
}: CategoryCardEditButtonProps): React.JSX.Element => (
  <Button
    variant={BUTTON.BASE}
    aria-expanded={isOpen}
    aria-controls={panelId}
    onClick={onClick}
    className={CATEGORY_CARD_EDIT_BUTTON_CLASS}
  >
    <EditIcon
      className={CATEGORY_CARD_EDIT_ICON_CLASS}
      color={CATEGORY_CARD_ICON_COLOR}
    />
    {CATEGORY_CATALOG_COPY.EDIT_BUTTON}
  </Button>
);

export default CategoryCardEditButton;
