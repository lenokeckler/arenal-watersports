import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import InlineText from "@/app/components/text/InlineText";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import type { ExtraCardCompatibilityProps } from "../models/ExtraCardCompatibilityProps.interface";
import {
  EXTRA_CARD_FACT_CLASS,
  EXTRA_CARD_FACT_ICON_CLASS,
  EXTRA_CARD_MISSING_CLASS,
  EXTRA_CARD_MISSING_NOTE_CLASS,
} from "../styles/ExtraCard.styles";

const ExtraCardCompatibility = ({
  compatibilityLabel,
  hasCompatibility,
}: ExtraCardCompatibilityProps): React.JSX.Element => (
  <InlineText className={EXTRA_CARD_FACT_CLASS}>
    <MaterialIcon
      name={MATERIAL_ICON_NAME.DIRECTIONS_BOAT}
      className={EXTRA_CARD_FACT_ICON_CLASS}
    />
    {hasCompatibility ? (
      <InlineText>{compatibilityLabel}</InlineText>
    ) : (
      <>
        <InlineText className={EXTRA_CARD_MISSING_CLASS}>
          {compatibilityLabel}
        </InlineText>
        <InlineText
          className={EXTRA_CARD_MISSING_NOTE_CLASS}
        >
          {EXTRA_COMPATIBILITY_COPY.NOT_OFFERED}
        </InlineText>
      </>
    )}
  </InlineText>
);

export default ExtraCardCompatibility;
