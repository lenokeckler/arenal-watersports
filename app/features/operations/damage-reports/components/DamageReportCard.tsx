import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageReportCardProps } from "../models/DamageReportCardProps.interface";
import {
  DAMAGE_REPORTS_CARD_CLASS,
  DAMAGE_REPORTS_CARD_DETAIL_CLASS,
  DAMAGE_REPORTS_CARD_HEADING_CLASS,
} from "../styles/DamageReports.styles";
import { getReportDetailText } from "../utils/getReportDetailText";
import type { JSX } from "react";

const DamageReportCard = ({
  entry,
}: DamageReportCardProps): JSX.Element => (
  <div className={DAMAGE_REPORTS_CARD_CLASS}>
    <Title
      id={`${DAMAGE_REPORTS_COPY.TITLE_ID_PREFIX}${entry.id}`}
      variant={TitleVariant.SECONDARY}
      text={DAMAGE_REPORTS_COPY.CAUSES[entry.cause]}
      className={DAMAGE_REPORTS_CARD_HEADING_CLASS}
    />
    <Text className={DAMAGE_REPORTS_CARD_DETAIL_CLASS}>
      {entry.description}
    </Text>
    <Text className={DAMAGE_REPORTS_CARD_DETAIL_CLASS}>
      {getReportDetailText(entry)}
    </Text>
  </div>
);

export default DamageReportCard;
