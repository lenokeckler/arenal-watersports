import Link from "@/app/components/link/Link";
import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import {
  DAMAGE_CAUSE_LABELS,
  DAMAGE_PENDING_LABEL,
  PATHS,
} from "@/app/constants";
import { formatShortDay } from "@/app/utils/equipment-months/formatEquipmentDates";
import { UNIT_HISTORY_COPY } from "../constants/UnitHistoryCopy.constants";
import type { UnitHistoryDamageCardProps } from "../models/UnitHistoryDamageCardProps.interface";
import {
  UNIT_HISTORY_CARD_CLASS,
  UNIT_HISTORY_COMPLETE_CLASS,
  UNIT_HISTORY_META_CLASS,
  UNIT_HISTORY_ROW_CLASS,
  UNIT_HISTORY_TEXT_CLASS,
  UNIT_HISTORY_TITLE_CLASS,
} from "../styles/UnitHistory.styles";
import type { JSX } from "react";

const UnitHistoryDamageCard = ({
  report,
}: UnitHistoryDamageCardProps): JSX.Element => (
  <article className={UNIT_HISTORY_CARD_CLASS}>
    <div className={UNIT_HISTORY_ROW_CLASS}>
      <InlineText className={UNIT_HISTORY_TITLE_CLASS}>
        {report.isPending || !report.cause
          ? DAMAGE_PENDING_LABEL
          : DAMAGE_CAUSE_LABELS[report.cause]}
      </InlineText>
      <InlineText className={UNIT_HISTORY_META_CLASS}>
        {formatShortDay(report.date)}
      </InlineText>
    </div>
    {report.description && (
      <Text className={UNIT_HISTORY_TEXT_CLASS}>
        {report.description}
      </Text>
    )}
    <Text className={UNIT_HISTORY_META_CLASS}>
      {UNIT_HISTORY_COPY.HITS_ADDED(report.hits)}
    </Text>
    {report.isPending && (
      <Link
        href={PATHS.OPERATIONS.DAMAGE_REPORT_COMPLETE(
          report.id
        )}
        className={UNIT_HISTORY_COMPLETE_CLASS}
      >
        {UNIT_HISTORY_COPY.COMPLETE}
      </Link>
    )}
  </article>
);

export default UnitHistoryDamageCard;
