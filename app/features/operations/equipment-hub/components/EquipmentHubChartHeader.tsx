import Link from "@/app/components/link/Link";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import type { EquipmentHubChartHeaderProps } from "../models/EquipmentHubChartHeaderProps.interface";
import {
  EQUIPMENT_HUB_CHART_HEADER_CLASS,
  EQUIPMENT_HUB_CHART_TITLE_CLASS,
  EQUIPMENT_HUB_MORE_CLASS,
} from "../styles/EquipmentHub.styles";
import type { JSX } from "react";

const EquipmentHubChartHeader = ({
  href,
  linkLabel,
  title,
}: EquipmentHubChartHeaderProps): JSX.Element => (
  <div className={EQUIPMENT_HUB_CHART_HEADER_CLASS}>
    <Title
      variant={TitleVariant.SECONDARY}
      text={title}
      className={EQUIPMENT_HUB_CHART_TITLE_CLASS}
    />
    <Link
      href={href}
      className={EQUIPMENT_HUB_MORE_CLASS}
    >
      {linkLabel}
    </Link>
  </div>
);

export default EquipmentHubChartHeader;
