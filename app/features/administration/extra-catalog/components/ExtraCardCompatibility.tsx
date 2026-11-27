import InlineText from "@/app/components/text/InlineText";
import type { ExtraCardCompatibilityLabelProps } from "../models/ExtraCardCompatibilityLabelProps.interface";
import { EXTRA_CARD_COMPATIBILITY_LABEL_CLASS } from "../styles/ExtraCard.styles";

const ExtraCardCompatibility = ({
  label,
}: ExtraCardCompatibilityLabelProps): React.JSX.Element => (
  <InlineText
    className={EXTRA_CARD_COMPATIBILITY_LABEL_CLASS}
  >
    {label}
  </InlineText>
);

export default ExtraCardCompatibility;
