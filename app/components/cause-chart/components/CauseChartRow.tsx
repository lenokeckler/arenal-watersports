import Link from "@/app/components/link/Link";
import InlineText from "@/app/components/text/InlineText";
import {
  ARIA_CURRENT,
  DAMAGE_CAUSE_LABELS,
} from "@/app/constants";
import { resolveBarShare } from "@/app/utils/chart/resolveBarShare";
import { CAUSE_CHART_COPY } from "../constants/CauseChartCopy.constants";
import type { CauseChartRowProps } from "../models/CauseChartRowProps.interface";
import {
  CAUSE_CHART_BAR_CLASS,
  CAUSE_CHART_TRACK_CLASS,
  CAUSE_CHART_VALUE_CLASS,
  resolveCauseChartRowClass,
} from "../styles/CauseChart.styles";
import type { JSX } from "react";

const CauseChartRow = ({
  cause,
  count,
  highest,
  href,
  isCurrent,
}: CauseChartRowProps): JSX.Element => (
  <Link
    href={href}
    ariaLabel={CAUSE_CHART_COPY.BAR_LABEL(
      DAMAGE_CAUSE_LABELS[cause],
      count
    )}
    ariaCurrent={isCurrent ? ARIA_CURRENT.PAGE : undefined}
    className={resolveCauseChartRowClass(isCurrent)}
    scroll={false}
  >
    <InlineText>{DAMAGE_CAUSE_LABELS[cause]}</InlineText>
    <InlineText className={CAUSE_CHART_TRACK_CLASS}>
      <InlineText
        className={CAUSE_CHART_BAR_CLASS}
        style={{ width: resolveBarShare(count, highest) }}
      >
        {null}
      </InlineText>
    </InlineText>
    <InlineText className={CAUSE_CHART_VALUE_CLASS}>
      {count}
    </InlineText>
  </Link>
);

export default CauseChartRow;
