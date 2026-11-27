import InlineText from "@/app/components/text/InlineText";
import { IMPACT_COUNT_COPY } from "./constants/ImpactCountCopy.constants";
import type { ImpactCountProps } from "./models/ImpactCountProps.interface";
import {
  IMPACT_COUNT_CLASS,
  IMPACT_COUNT_SPOKEN_CLASS,
} from "./styles/ImpactCount.styles";
import type { JSX } from "react";

const ImpactCount = ({
  count,
}: ImpactCountProps): JSX.Element => (
  <InlineText className={IMPACT_COUNT_CLASS}>
    <InlineText aria-hidden>
      {IMPACT_COUNT_COPY.SHORT(count)}
    </InlineText>
    <InlineText className={IMPACT_COUNT_SPOKEN_CLASS}>
      {IMPACT_COUNT_COPY.SPOKEN(count)}
    </InlineText>
  </InlineText>
);

export default ImpactCount;
