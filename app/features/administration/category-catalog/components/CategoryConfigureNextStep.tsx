import Button from "@/app/components/button/Button";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { BUTTON, BUTTON_TYPES } from "@/app/constants";
import { CATEGORY_CONFIGURE_NEXT_STEP_STATE } from "../constants/CategoryConfigureNextStepState.constants";
import type { CategoryConfigureNextStepProps } from "../models/CategoryConfigureNextStepProps.interface";
import {
  CATEGORY_CONFIGURE_NEXT_STEP_BUTTON_CLASS,
  CATEGORY_CONFIGURE_NEXT_STEP_CLASS,
  CATEGORY_CONFIGURE_NEXT_STEP_HELP_CLASS,
  CATEGORY_CONFIGURE_NEXT_STEP_ICON_CLASS,
  CATEGORY_CONFIGURE_NEXT_STEP_OPTIONAL_CLASS,
  CATEGORY_CONFIGURE_NEXT_STEP_TEXT_CLASS,
  CATEGORY_CONFIGURE_NEXT_STEP_TITLE_CLASS,
} from "../styles/CategoryConfigureNextSteps.styles";

const CategoryConfigureNextStep = ({
  id,
  state,
  title,
  help,
  action,
  actionLabel,
  optionalLabel,
  onAction,
}: CategoryConfigureNextStepProps): React.JSX.Element => (
  <div className={CATEGORY_CONFIGURE_NEXT_STEP_CLASS}>
    <MaterialIcon
      name={
        state === CATEGORY_CONFIGURE_NEXT_STEP_STATE.DONE
          ? MATERIAL_ICON_NAME.CHECK_CIRCLE
          : MATERIAL_ICON_NAME.RADIO_BUTTON_UNCHECKED
      }
      className={
        CATEGORY_CONFIGURE_NEXT_STEP_ICON_CLASS[state]
      }
    />
    <div
      className={CATEGORY_CONFIGURE_NEXT_STEP_TEXT_CLASS}
    >
      <Text
        className={CATEGORY_CONFIGURE_NEXT_STEP_TITLE_CLASS}
      >
        {title}
        {state ===
          CATEGORY_CONFIGURE_NEXT_STEP_STATE.OPTIONAL && (
          <InlineText
            className={
              CATEGORY_CONFIGURE_NEXT_STEP_OPTIONAL_CLASS
            }
          >
            {optionalLabel}
          </InlineText>
        )}
      </Text>
      <Text
        className={CATEGORY_CONFIGURE_NEXT_STEP_HELP_CLASS}
      >
        {help}
      </Text>
    </div>
    {state !== CATEGORY_CONFIGURE_NEXT_STEP_STATE.DONE && (
      <Button
        variant={BUTTON.BASE}
        type={BUTTON_TYPES.BUTTON}
        aria-label={actionLabel}
        onClick={() => onAction(id)}
        className={
          CATEGORY_CONFIGURE_NEXT_STEP_BUTTON_CLASS
        }
      >
        {action}
      </Button>
    )}
  </div>
);

export default CategoryConfigureNextStep;
