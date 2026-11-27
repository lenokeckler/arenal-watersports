import Link from "@/app/components/link/Link";
import InlineText from "@/app/components/text/InlineText";
import { ARIA_CURRENT } from "@/app/constants";
import { resolveBarShare } from "@/app/utils/chart/resolveBarShare";
import { SPEND_CHART_COPY } from "../constants/SpendChartCopy.constants";
import type { SpendChartColumnProps } from "../models/SpendChartColumnProps.interface";
import {
  SPEND_CHART_COLUMN_CLASS,
  SPEND_CHART_PLOT_CLASS,
  resolveSpendChartBarClass,
  resolveSpendChartMonthClass,
} from "../styles/SpendChart.styles";
import type { JSX } from "react";

const SpendChartColumn = ({
  bar,
  highest,
}: SpendChartColumnProps): JSX.Element => (
  <Link
    href={bar.href}
    ariaLabel={SPEND_CHART_COPY.BAR_LABEL(
      bar.label,
      bar.text
    )}
    ariaCurrent={
      bar.isCurrent ? ARIA_CURRENT.PAGE : undefined
    }
    className={SPEND_CHART_COLUMN_CLASS}
    scroll={false}
  >
    <InlineText className={SPEND_CHART_PLOT_CLASS}>
      <InlineText
        className={resolveSpendChartBarClass(bar.isCurrent)}
        style={{
          height: resolveBarShare(bar.amount, highest),
        }}
      >
        {null}
      </InlineText>
    </InlineText>
    <InlineText
      className={resolveSpendChartMonthClass(bar.isCurrent)}
    >
      {bar.shortLabel}
    </InlineText>
  </Link>
);

export default SpendChartColumn;
