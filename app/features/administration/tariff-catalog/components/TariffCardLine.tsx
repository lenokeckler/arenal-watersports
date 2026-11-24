import InlineText from "@/app/components/text/InlineText";
import type { TariffLineViewModel } from "../models/TariffLineViewModel.interface";
import {
  TARIFF_CARD_LINE_AMOUNTS_CLASS,
  TARIFF_CARD_LINE_CLASS,
  TARIFF_CARD_LINE_LABEL_CLASS,
  TARIFF_CARD_LINE_UNIT_CLASS,
  TARIFF_CARD_LINE_VALUE_CLASS,
} from "../styles/TariffCard.styles";

const TariffCardLine = ({
  amounts,
  label,
  unit,
}: TariffLineViewModel): React.JSX.Element => (
  <div className={TARIFF_CARD_LINE_CLASS}>
    <InlineText className={TARIFF_CARD_LINE_LABEL_CLASS}>
      {label}
    </InlineText>
    <div className={TARIFF_CARD_LINE_VALUE_CLASS}>
      <InlineText
        className={TARIFF_CARD_LINE_AMOUNTS_CLASS}
      >
        {amounts}
      </InlineText>
      {unit && (
        <InlineText className={TARIFF_CARD_LINE_UNIT_CLASS}>
          {unit}
        </InlineText>
      )}
    </div>
  </div>
);

export default TariffCardLine;
