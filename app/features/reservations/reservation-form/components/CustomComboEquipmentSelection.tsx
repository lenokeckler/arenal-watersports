import SectionTitle from "@/app/components/section-title/SectionTitle";
import Section from "@/app/components/section/Section";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import {
  CUSTOM_COMBO_FORM_COPY,
  CUSTOM_COMBO_FORM_INPUT_ID,
} from "../constants/CustomComboFormCopy.constants";
import { RESERVATION_FORM_FOCUS_TARGET } from "../constants/ReservationFormUi.constants";
import type { CustomComboEquipmentSelectionFieldProps } from "../models/CustomComboEquipmentSelectionFieldProps.interface";
import {
  CUSTOM_COMBO_DESCRIPTION_CLASS,
  CUSTOM_COMBO_HEADING_CLASS,
  CUSTOM_COMBO_SELECTION_ERROR_CLASS,
  CUSTOM_COMBO_SECTION_CLASS,
} from "../styles/CustomComboEquipmentSelection.styles";
import CustomComboEquipmentCategoryList from "./CustomComboEquipmentCategoryList";
import ReservationCategoryConflictWarning from "./ReservationCategoryConflictWarning";

const CustomComboEquipmentSelection = ({
  categories,
  date,
  durationHours,
  error,
  time,
  viewModel,
}: CustomComboEquipmentSelectionFieldProps): React.JSX.Element => (
  <Section
    aria-label={CUSTOM_COMBO_FORM_COPY.TITLE}
    aria-describedby={
      error
        ? CUSTOM_COMBO_FORM_INPUT_ID.EQUIPMENT_SELECTION_ERROR
        : undefined
    }
    aria-invalid={Boolean(error)}
    className={CUSTOM_COMBO_SECTION_CLASS}
    id={CUSTOM_COMBO_FORM_INPUT_ID.EQUIPMENT_SELECTION}
    tabIndex={RESERVATION_FORM_FOCUS_TARGET.TAB_INDEX}
  >
    <header>
      <SectionTitle
        className={CUSTOM_COMBO_HEADING_CLASS}
        text={CUSTOM_COMBO_FORM_COPY.TITLE}
      />
      <Text className={CUSTOM_COMBO_DESCRIPTION_CLASS}>
        {CUSTOM_COMBO_FORM_COPY.DESCRIPTION}
      </Text>
    </header>
    {categories.length === 0 ? (
      <Text>{CUSTOM_COMBO_FORM_COPY.NO_CATEGORIES}</Text>
    ) : (
      <>
        <CustomComboEquipmentCategoryList
          categories={categories}
          date={date}
          durationHours={durationHours}
          time={time}
          viewModel={viewModel}
        />
        <ReservationCategoryConflictWarning
          viewModel={viewModel.conflictWarning}
        />
      </>
    )}
    {error ? (
      <Text
        className={CUSTOM_COMBO_SELECTION_ERROR_CLASS}
        id={
          CUSTOM_COMBO_FORM_INPUT_ID.EQUIPMENT_SELECTION_ERROR
        }
        role={ARIA_ROLE.ALERT}
        tabIndex={RESERVATION_FORM_FOCUS_TARGET.TAB_INDEX}
      >
        {error}
      </Text>
    ) : null}
  </Section>
);

export default CustomComboEquipmentSelection;
