import Link from "@/app/components/link/Link";
import InlineText from "@/app/components/text/InlineText";
import { resolveBarShare } from "@/app/utils/chart/resolveBarShare";
import type { RankChartItemProps } from "../models/RankChartItemProps.interface";
import {
  RANK_CHART_BAR_CLASS,
  RANK_CHART_LABEL_CLASS,
  RANK_CHART_ROW_CLASS,
  RANK_CHART_STATIC_ROW_CLASS,
  RANK_CHART_TRACK_CLASS,
  RANK_CHART_VALUE_CLASS,
} from "../styles/RankChart.styles";
import type { JSX } from "react";

const RankChartItem = ({
  highest,
  row,
}: RankChartItemProps): JSX.Element => {
  const content = (
    <>
      <InlineText className={RANK_CHART_LABEL_CLASS}>
        {row.label}
      </InlineText>
      <InlineText className={RANK_CHART_VALUE_CLASS}>
        {row.valueText}
      </InlineText>
      <InlineText className={RANK_CHART_TRACK_CLASS}>
        <InlineText
          className={RANK_CHART_BAR_CLASS}
          style={{
            width: resolveBarShare(row.amount, highest),
          }}
        >
          {null}
        </InlineText>
      </InlineText>
    </>
  );

  return row.href ? (
    <Link
      href={row.href}
      ariaLabel={`${row.label}: ${row.valueText}`}
      className={RANK_CHART_ROW_CLASS}
    >
      {content}
    </Link>
  ) : (
    <div className={RANK_CHART_STATIC_ROW_CLASS}>
      {content}
    </div>
  );
};

export default RankChartItem;
