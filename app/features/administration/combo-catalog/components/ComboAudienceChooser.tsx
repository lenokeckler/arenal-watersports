import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE, BUTTON } from "@/app/constants";
import { COMBO_AUDIENCE_OPTION_LABEL } from "../constants/ComboAudienceOptionCopy.constants";
import { COMBO_AUDIENCE_ORDER } from "../constants/ComboAudienceOrder.constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import type { ComboAudienceChooserProps } from "../models/ComboAudienceChooserProps.interface";
import {
  COMBO_AUDIENCE_LOCKED_CLASS,
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
      <Text className={COMBO_AUDIENCE_LOCKED_CLASS}>
        {COMBO_AUDIENCE_OPTION_LABEL[audience]}
      </Text>
    ) : (
      <div className={COMBO_AUDIENCE_OPTIONS_CLASS}>
        {COMBO_AUDIENCE_ORDER.map((option) => (
          <Button
            key={option}
            variant={BUTTON.BASE}
            type="button"
            aria-pressed={option === audience}
            disabled={isDisabled}
            onClick={onSelect(option)}
            className={resolveComboAudienceOptionClassName(
              option === audience
            )}
          >
            {COMBO_AUDIENCE_OPTION_LABEL[option]}
          </Button>
        ))}
      </div>
    )}
  </div>
);

export default ComboAudienceChooser;
