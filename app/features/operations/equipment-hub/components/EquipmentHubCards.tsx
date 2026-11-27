import type { EquipmentHubCardsProps } from "../models/EquipmentHubCardsProps.type";
import { buildHubCards } from "../utils/buildHubCards";
import { EQUIPMENT_HUB_CARDS_CLASS } from "../styles/EquipmentHub.styles";
import EquipmentHubCardLink from "./EquipmentHubCardLink";
import type { JSX } from "react";

const EquipmentHubCards = ({
  data,
}: EquipmentHubCardsProps): JSX.Element => (
  <div className={EQUIPMENT_HUB_CARDS_CLASS}>
    {buildHubCards(data).map((card) => (
      <EquipmentHubCardLink
        key={card.href}
        card={card}
      />
    ))}
  </div>
);

export default EquipmentHubCards;
