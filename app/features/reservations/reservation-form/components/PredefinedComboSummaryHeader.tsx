import SectionTitle from "@/app/components/section-title/SectionTitle";
import Text from "@/app/components/text/Text";
import { PREDEFINED_COMBO_FORM_COPY } from "../constants/PredefinedComboFormCopy.constants";
import type { PredefinedComboSummaryContentProps } from "../models/PredefinedComboSummaryContentProps.interface";
import {
  PREDEFINED_COMBO_SUMMARY_AUDIENCE_CLASS,
  PREDEFINED_COMBO_SUMMARY_HEADER_CLASS,
  PREDEFINED_COMBO_SUMMARY_NAME_CLASS,
} from "../styles/PredefinedComboSummary.styles";
import { getPredefinedComboAudienceLabel } from "../utils/getPredefinedComboAudienceLabel";

const PredefinedComboSummaryHeader = ({
  combo,
}: PredefinedComboSummaryContentProps): React.JSX.Element => (
  <header className={PREDEFINED_COMBO_SUMMARY_HEADER_CLASS}>
    <div>
      <SectionTitle
        text={PREDEFINED_COMBO_FORM_COPY.SUMMARY_TITLE}
      />
      <Text className={PREDEFINED_COMBO_SUMMARY_NAME_CLASS}>
        {combo.name}
      </Text>
    </div>
    <Text
      className={PREDEFINED_COMBO_SUMMARY_AUDIENCE_CLASS}
    >
      {getPredefinedComboAudienceLabel(combo)}
    </Text>
  </header>
);

export default PredefinedComboSummaryHeader;
