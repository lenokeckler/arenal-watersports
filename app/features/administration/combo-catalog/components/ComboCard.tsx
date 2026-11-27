import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Link from "@/app/components/link/Link";
import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { ARIA_ROLE, TitleVariant } from "@/app/constants";
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";
import type { ComboCardViewModel } from "../models/ComboCardViewModel.interface";
import {
  COMBO_CARD_ACTIONS_ROW_CLASS,
  COMBO_CARD_BODY_CLASS,
  COMBO_CARD_CONTAINER_CLASS,
  COMBO_CARD_EDIT_LINK_CLASS,
  COMBO_CARD_HEADING_ROW_CLASS,
  COMBO_CARD_ITEMS_CLASS,
  COMBO_CARD_ITEMS_ICON_CLASS,
  COMBO_CARD_NAME_CLASS,
  COMBO_CARD_PRICE_CLASS,
  COMBO_CARD_PRICE_UNIT_CLASS,
} from "../styles/ComboCard.styles";
import ComboCardActions from "./ComboCardActions";
import ComboCardStatusChip from "./ComboCardStatusChip";

const ComboCard = (
  card: ComboCardViewModel
): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={card.name}
    className={COMBO_CARD_CONTAINER_CLASS}
  >
    <div className={COMBO_CARD_BODY_CLASS[card.status]}>
      <div className={COMBO_CARD_HEADING_ROW_CLASS}>
        <Title
          variant={TitleVariant.AUXILIAR}
          text={card.name}
          className={COMBO_CARD_NAME_CLASS}
        />
        <ComboCardStatusChip status={card.status} />
      </div>
      <div className={COMBO_CARD_ITEMS_CLASS}>
        <MaterialIcon
          name={MATERIAL_ICON_NAME.INVENTORY_2}
          className={COMBO_CARD_ITEMS_ICON_CLASS}
        />
        <Text>{card.itemsSummary}</Text>
      </div>
      <Text className={COMBO_CARD_PRICE_CLASS}>
        <InlineText>{card.priceLabel}</InlineText>
        {card.priceUnit && (
          <InlineText
            className={COMBO_CARD_PRICE_UNIT_CLASS}
          >
            {card.priceUnit}
          </InlineText>
        )}
      </Text>
    </div>
    <div className={COMBO_CARD_ACTIONS_ROW_CLASS}>
      <Link
        href={card.editHref}
        className={COMBO_CARD_EDIT_LINK_CLASS}
      >
        {COMBO_CATALOG_COPY.EDIT_LINK}
      </Link>
      <ComboCardActions {...card} />
    </div>
  </div>
);

export default ComboCard;
