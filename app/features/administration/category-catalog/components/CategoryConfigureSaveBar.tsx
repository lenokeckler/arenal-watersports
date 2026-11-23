import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import {
  ARIA_ROLE,
  BUTTON,
  BUTTON_TYPES,
} from "@/app/constants";
import { CATEGORY_CONFIGURE_SAVE_COPY } from "../constants/CategoryConfigureSaveCopy.constants";
import { CATEGORY_CONFIGURE_SAVE_STATUS } from "../constants/CategoryConfigureSaveStatus.constants";
import type { CategoryConfigureSaveBarProps } from "../models/CategoryConfigureSaveBarProps.interface";
import {
  CATEGORY_CONFIGURE_SAVE_BAR_ACTIONS_CLASS,
  CATEGORY_CONFIGURE_SAVE_BAR_BUTTON_CLASS,
  CATEGORY_CONFIGURE_SAVE_BAR_CLASS,
  CATEGORY_CONFIGURE_SAVE_BAR_MESSAGE_CLASS,
  CATEGORY_CONFIGURE_SAVE_BAR_SPACER_CLASS,
} from "../styles/CategoryConfigureSaveBar.styles";

const CategoryConfigureSaveBar = ({
  message,
  status,
  isDisabled,
  onSave,
}: CategoryConfigureSaveBarProps): React.JSX.Element => (
  <>
    <div
      aria-hidden="true"
      className={CATEGORY_CONFIGURE_SAVE_BAR_SPACER_CLASS}
    />
    <div className={CATEGORY_CONFIGURE_SAVE_BAR_CLASS}>
      {message && (
        <Text
          role={ARIA_ROLE.STATUS}
          className={
            CATEGORY_CONFIGURE_SAVE_BAR_MESSAGE_CLASS
          }
        >
          {message}
        </Text>
      )}
      <div
        className={
          CATEGORY_CONFIGURE_SAVE_BAR_ACTIONS_CLASS
        }
      >
        {status ===
          CATEGORY_CONFIGURE_SAVE_STATUS.FAILED && (
          <Button
            variant={BUTTON.SECONDARY}
            type={BUTTON_TYPES.BUTTON}
            onClick={onSave}
            className={
              CATEGORY_CONFIGURE_SAVE_BAR_BUTTON_CLASS
            }
          >
            {CATEGORY_CONFIGURE_SAVE_COPY.RETRY}
          </Button>
        )}
        <Button
          variant={BUTTON.PRIMARY}
          type={BUTTON_TYPES.BUTTON}
          isLoading={
            status === CATEGORY_CONFIGURE_SAVE_STATUS.SAVING
          }
          loadingText={CATEGORY_CONFIGURE_SAVE_COPY.SAVING}
          disabled={isDisabled}
          onClick={onSave}
          className={
            CATEGORY_CONFIGURE_SAVE_BAR_BUTTON_CLASS
          }
        >
          {CATEGORY_CONFIGURE_SAVE_COPY.SAVE}
        </Button>
      </div>
    </div>
  </>
);

export default CategoryConfigureSaveBar;
