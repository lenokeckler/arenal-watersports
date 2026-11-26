import Link from "@/app/components/link/Link";
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
  COMBO_CARD_NAME_CLASS,
  COMBO_CARD_PRICE_CLASS,
} from "../styles/ComboCard.styles";
import ComboCardActions from "./ComboCardActions";
import ComboCardStatusChip from "./ComboCardStatusChip";

const ComboCard = (
  card: ComboCardViewModel
): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={card.name}
    className={COMBO_CARD_CONTAINER_CLASS[card.status]}
  >
    <div className={COMBO_CARD_BODY_CLASS}>
      <div className={COMBO_CARD_HEADING_ROW_CLASS}>
        <Title
          variant={TitleVariant.AUXILIAR}
          text={card.name}
          className={COMBO_CARD_NAME_CLASS}
        />
        <ComboCardStatusChip status={card.status} />
      </div>
      <Text className={COMBO_CARD_ITEMS_CLASS}>
        {card.itemsSummary}
      </Text>
      <Text className={COMBO_CARD_PRICE_CLASS}>
        {card.priceLabel}
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
