import Section from "@/app/components/section/Section";
import SectionTitle from "@/app/components/section-title/SectionTitle";
import Text from "@/app/components/text/Text";
import { PREDEFINED_COMBO_SELECTION_MODE } from "../constants/PredefinedComboSelectionMode.constants";
import { PREDEFINED_COMBO_FORM_COPY } from "../constants/PredefinedComboFormCopy.constants";
import type { PredefinedComboSelectionProps } from "../models/PredefinedComboSelectionProps.interface";
import {
  PREDEFINED_COMBO_DESCRIPTION_CLASS,
  PREDEFINED_COMBO_SECTION_CLASS,
} from "../styles/PredefinedComboSelection.styles";
import PredefinedComboCatalogField from "./PredefinedComboCatalogField";
import PredefinedComboModeSelector from "./PredefinedComboModeSelector";

const PredefinedComboSelection = ({
  viewModel,
}: PredefinedComboSelectionProps): React.JSX.Element => (
  <Section
    aria-label={PREDEFINED_COMBO_FORM_COPY.TITLE}
    className={PREDEFINED_COMBO_SECTION_CLASS}
  >
    <header>
      <SectionTitle
        text={PREDEFINED_COMBO_FORM_COPY.TITLE}
      />
      <Text className={PREDEFINED_COMBO_DESCRIPTION_CLASS}>
        {PREDEFINED_COMBO_FORM_COPY.DESCRIPTION}
      </Text>
    </header>
    <PredefinedComboModeSelector
      mode={viewModel.mode}
      onModeChange={viewModel.handleModeChange}
    />
    {viewModel.mode ===
      PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED && (
      <PredefinedComboCatalogField
        combos={viewModel.combos}
        onComboSelection={viewModel.handleComboSelection}
        selectedComboId={viewModel.selectedComboId}
      />
    )}
  </Section>
);

export default PredefinedComboSelection;
