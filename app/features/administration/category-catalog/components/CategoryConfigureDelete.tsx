import ActionSheet from "@/app/components/action-sheet/ActionSheet";
import Button from "@/app/components/button/Button";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Text from "@/app/components/text/Text";
import { BUTTON, BUTTON_TYPES } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryConfigureDeleteProps } from "../models/CategoryConfigureDeleteProps.interface";
import { CATEGORY_CONFIGURE_BODY_CLASS } from "../styles/CategoryConfigureBody.styles";
import {
  CATEGORY_CONFIGURE_DELETE_BUTTON_CLASS,
  CATEGORY_CONFIGURE_DELETE_SHEET_BUTTON_CLASS,
  CATEGORY_CONFIGURE_DELETE_SHEET_TEXT_CLASS,
} from "../styles/CategoryConfigureDelete.styles";

const CategoryConfigureDelete = ({
  name,
  isSheetOpen,
  isPending,
  onOpen,
  onClose,
  onConfirm,
  onDeactivate,
}: CategoryConfigureDeleteProps): React.JSX.Element => (
  <>
    <Button
      variant={BUTTON.BASE}
      type={BUTTON_TYPES.BUTTON}
      onClick={onOpen}
      className={CATEGORY_CONFIGURE_DELETE_BUTTON_CLASS}
    >
      <MaterialIcon name={MATERIAL_ICON_NAME.DELETE} />
      {CATEGORY_CATALOG_COPY.DELETE_CATEGORY_BUTTON}
    </Button>
    {isSheetOpen && (
      <ActionSheet
        title={CATEGORY_CONFIGURE_COPY.DELETE_TITLE(name)}
        onClose={onClose}
      >
        <div className={CATEGORY_CONFIGURE_BODY_CLASS}>
          <Text
            className={
              CATEGORY_CONFIGURE_DELETE_SHEET_TEXT_CLASS
            }
          >
            {CATEGORY_CONFIGURE_COPY.DELETE_BODY}
          </Text>
          <Button
            variant={BUTTON.DANGER}
            type={BUTTON_TYPES.BUTTON}
            isLoading={isPending}
            onClick={onConfirm}
            className={
              CATEGORY_CONFIGURE_DELETE_SHEET_BUTTON_CLASS
            }
          >
            {CATEGORY_CONFIGURE_COPY.DELETE_CONFIRM(name)}
          </Button>
          <Text
            className={
              CATEGORY_CONFIGURE_DELETE_SHEET_TEXT_CLASS
            }
          >
            {CATEGORY_CONFIGURE_COPY.DELETE_ALTERNATIVE}
          </Text>
          <Button
            variant={BUTTON.SECONDARY}
            type={BUTTON_TYPES.BUTTON}
            disabled={isPending}
            onClick={onDeactivate}
            className={
              CATEGORY_CONFIGURE_DELETE_SHEET_BUTTON_CLASS
            }
          >
            {CATEGORY_CONFIGURE_COPY.DELETE_DEACTIVATE}
          </Button>
        </div>
      </ActionSheet>
    )}
  </>
);

export default CategoryConfigureDelete;
