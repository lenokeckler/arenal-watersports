import Button from "@/app/components/button/Button";
import InlineText from "@/app/components/text/InlineText";
import { BUTTON } from "@/app/constants";
import type { CategoryCreateFormChoiceCardProps } from "../models/CategoryCreateFormChoiceCardProps.interface";
import {
  CATEGORY_CREATE_FORM_CHOICE_HELP_CLASS,
  CATEGORY_CREATE_FORM_CHOICE_LABEL_CLASS,
  resolveCategoryCreateFormChoiceCardClassName,
} from "../styles/CategoryCreateFormChoice.styles";

const CategoryCreateFormChoiceCard = ({
  choice,
  isSelected,
  isDisabled,
  onSelect,
}: CategoryCreateFormChoiceCardProps): React.JSX.Element => (
  <Button
    variant={BUTTON.BASE}
    type="button"
    aria-pressed={isSelected}
    disabled={isDisabled}
    onClick={() => onSelect(choice.value)}
    className={resolveCategoryCreateFormChoiceCardClassName(
      isSelected
    )}
  >
    <InlineText
      className={CATEGORY_CREATE_FORM_CHOICE_LABEL_CLASS}
    >
      {choice.label}
    </InlineText>
    {choice.help && (
      <InlineText
        className={CATEGORY_CREATE_FORM_CHOICE_HELP_CLASS}
      >
        {choice.help}
      </InlineText>
    )}
  </Button>
);

export default CategoryCreateFormChoiceCard;
