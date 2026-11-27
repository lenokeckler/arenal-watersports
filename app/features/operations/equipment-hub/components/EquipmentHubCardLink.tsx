import Link from "@/app/components/link/Link";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import InlineText from "@/app/components/text/InlineText";
import type { EquipmentHubCardLinkProps } from "../models/EquipmentHubCardLinkProps.interface";
import {
  EQUIPMENT_HUB_CARD_BODY_CLASS,
  EQUIPMENT_HUB_CARD_CLASS,
  EQUIPMENT_HUB_CARD_DETAIL_CLASS,
  EQUIPMENT_HUB_CARD_TITLE_CLASS,
  EQUIPMENT_HUB_TILE_CLASS,
} from "../styles/EquipmentHub.styles";
import type { JSX } from "react";

const EquipmentHubCardLink = ({
  card,
}: EquipmentHubCardLinkProps): JSX.Element => (
  <Link
    href={card.href}
    className={EQUIPMENT_HUB_CARD_CLASS}
  >
    <InlineText className={EQUIPMENT_HUB_TILE_CLASS}>
      <MaterialIcon name={card.icon} />
    </InlineText>
    <InlineText className={EQUIPMENT_HUB_CARD_BODY_CLASS}>
      <InlineText
        className={EQUIPMENT_HUB_CARD_TITLE_CLASS}
      >
        {card.title}
      </InlineText>
      <InlineText
        className={EQUIPMENT_HUB_CARD_DETAIL_CLASS}
      >
        {card.detail}
      </InlineText>
    </InlineText>
  </Link>
);

export default EquipmentHubCardLink;
