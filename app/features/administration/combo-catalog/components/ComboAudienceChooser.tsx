import Button from "@/app/components/button/Button";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE, BUTTON } from "@/app/constants";
import { COMBO_AUDIENCE_PRICE_NOTE } from "../constants/ComboAudienceCopy.constants";
import { COMBO_AUDIENCE_OPTION_LABEL } from "../constants/ComboAudienceOptionCopy.constants";
import { COMBO_AUDIENCE_ORDER } from "../constants/ComboAudienceOrder.constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import type { ComboAudienceChooserProps } from "../models/ComboAudienceChooserProps.interface";
import {
  COMBO_AUDIENCE_HELP_CLASS,
  COMBO_AUDIENCE_LOCKED_CLASS,
  COMBO_AUDIENCE_LOCKED_ICON_CLASS,
  COMBO_AUDIENCE_LOCKED_LABEL_CLASS,
  COMBO_AUDIENCE_LOCKED_NOTE_CLASS,
  COMBO_AUDIENCE_OPTION_NOTE_CLASS,
  COMBO_AUDIENCE_OPTIONS_CLASS,
  COMBO_FORM_GROUP_CLASS,
  COMBO_FORM_GROUP_TITLE_CLASS,
  resolveComboAudienceOptionClassName,
} from "../styles/ComboForm.styles";

const ComboAudienceChooser = ({
  audience,
  isDisabled,
  isLocked,
  onSelect,
}: ComboAudienceChooserProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={COMBO_FORM_COPY.AUDIENCE_LABEL}
    className={COMBO_FORM_GROUP_CLASS}
  >
    <Text className={COMBO_FORM_GROUP_TITLE_CLASS}>
      {COMBO_FORM_COPY.AUDIENCE_LABEL}
    </Text>
    {isLocked ? (
      <div className={COMBO_AUDIENCE_LOCKED_CLASS}>
        <InlineText
          className={COMBO_AUDIENCE_LOCKED_LABEL_CLASS}
        >
          {COMBO_AUDIENCE_OPTION_LABEL[audience]}
        </InlineText>
        <InlineText
          className={COMBO_AUDIENCE_LOCKED_NOTE_CLASS}
        >
          <MaterialIcon
            name={MATERIAL_ICON_NAME.LOCK}
            className={COMBO_AUDIENCE_LOCKED_ICON_CLASS}
          />
          {COMBO_FORM_COPY.AUDIENCE_LOCKED_NOTE}
        </InlineText>
      </div>
    ) : (
      <>
        <div className={COMBO_AUDIENCE_OPTIONS_CLASS}>
          {COMBO_AUDIENCE_ORDER.map((option) => (
            <Button
              key={option}
              variant={BUTTON.BASE}
              type="button"
              aria-label={
                COMBO_AUDIENCE_OPTION_LABEL[option]
              }
              aria-pressed={option === audience}
              disabled={isDisabled}
              onClick={onSelect(option)}
              className={resolveComboAudienceOptionClassName(
                option === audience
              )}
            >
              <InlineText>
                {COMBO_AUDIENCE_OPTION_LABEL[option]}
              </InlineText>
              <InlineText
                className={COMBO_AUDIENCE_OPTION_NOTE_CLASS}
              >
                {COMBO_AUDIENCE_PRICE_NOTE[option]}
              </InlineText>
            </Button>
          ))}
        </div>
        <Text className={COMBO_AUDIENCE_HELP_CLASS}>
          {COMBO_FORM_COPY.AUDIENCE_FIXED_HELP}
        </Text>
      </>
    )}
  </div>
);

export default ComboAudienceChooser;
