import type { NullableRef } from "@/app/types";
import Section from "@/app/components/section/Section";
import { PREDEFINED_COMBO_FORM_COPY } from "../constants/PredefinedComboFormCopy.constants";
import type { PredefinedComboSummaryProps } from "../models/PredefinedComboSummaryProps.interface";
import { PREDEFINED_COMBO_SUMMARY_CLASS } from "../styles/PredefinedComboSummary.styles";
import PredefinedComboSummaryHeader from "./PredefinedComboSummaryHeader";
import PredefinedComboSummaryItems from "./PredefinedComboSummaryItems";
import PredefinedComboSummaryPrice from "./PredefinedComboSummaryPrice";

const PredefinedComboSummary = ({
  viewModel,
}: PredefinedComboSummaryProps): NullableRef<React.JSX.Element> => {
  const combo = viewModel.selectedCombo;
  if (!combo) {
    return null;
  }
  return (
    <Section
      aria-label={PREDEFINED_COMBO_FORM_COPY.SUMMARY_TITLE}
      className={PREDEFINED_COMBO_SUMMARY_CLASS}
    >
      <PredefinedComboSummaryHeader combo={combo} />
      <PredefinedComboSummaryItems combo={combo} />
      <PredefinedComboSummaryPrice combo={combo} />
    </Section>
  );
};

export default PredefinedComboSummary;
