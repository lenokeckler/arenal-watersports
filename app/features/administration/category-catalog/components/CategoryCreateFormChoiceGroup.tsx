import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import type { CategoryCreateFormChoiceGroupProps } from "../models/CategoryCreateFormChoiceGroupProps.interface";
import {
  CATEGORY_CREATE_FORM_CHOICE_CARDS_CLASS,
  CATEGORY_CREATE_FORM_CHOICE_ERROR_CLASS,
  CATEGORY_CREATE_FORM_CHOICE_GROUP_CLASS,
  CATEGORY_CREATE_FORM_CHOICE_LABEL_TEXT_CLASS,
  CATEGORY_CREATE_FORM_CHOICE_NOTE_CLASS,
} from "../styles/CategoryCreateFormChoice.styles";
import CategoryCreateFormChoiceCard from "./CategoryCreateFormChoiceCard";

const CategoryCreateFormChoiceGroup = ({
  id,
  label,
  choices,
  selectedValue,
  isDisabled,
  onSelect,
  note,
  error,
}: CategoryCreateFormChoiceGroupProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-labelledby={id}
    className={CATEGORY_CREATE_FORM_CHOICE_GROUP_CLASS}
  >
    <Text
      id={id}
      className={
        CATEGORY_CREATE_FORM_CHOICE_LABEL_TEXT_CLASS
      }
    >
      {label}
    </Text>
    <div
      className={CATEGORY_CREATE_FORM_CHOICE_CARDS_CLASS}
    >
      {choices.map((choice) => (
        <CategoryCreateFormChoiceCard
          key={choice.value}
          choice={choice}
          isSelected={choice.value === selectedValue}
          isDisabled={isDisabled}
          onSelect={onSelect}
        />
      ))}
    </div>
    {note && (
      <Text
        className={CATEGORY_CREATE_FORM_CHOICE_NOTE_CLASS}
      >
        {note}
      </Text>
    )}
    {error && (
      <Text
        role={ARIA_ROLE.ALERT}
        className={CATEGORY_CREATE_FORM_CHOICE_ERROR_CLASS}
      >
        {error}
      </Text>
    )}
  </div>
);

export default CategoryCreateFormChoiceGroup;
