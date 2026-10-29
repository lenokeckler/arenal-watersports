import SectionTitle from "@/app/components/section-title/SectionTitle";
import Section from "@/app/components/section/Section";
import Text from "@/app/components/text/Text";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import type { CustomComboEquipmentSelectionProps } from "../models/CustomComboEquipmentSelectionProps.interface";
import {
  CUSTOM_COMBO_DESCRIPTION_CLASS,
  CUSTOM_COMBO_HEADING_CLASS,
  CUSTOM_COMBO_SECTION_CLASS,
} from "../styles/CustomComboEquipmentSelection.styles";
import CustomComboEquipmentCategoryList from "./CustomComboEquipmentCategoryList";

const CustomComboEquipmentSelection = ({
  categories,
  viewModel,
}: CustomComboEquipmentSelectionProps): React.JSX.Element => (
  <Section
    aria-label={CUSTOM_COMBO_FORM_COPY.TITLE}
    className={CUSTOM_COMBO_SECTION_CLASS}
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
      <CustomComboEquipmentCategoryList
        categories={categories}
        viewModel={viewModel}
      />
    )}
  </Section>
);

export default CustomComboEquipmentSelection;
