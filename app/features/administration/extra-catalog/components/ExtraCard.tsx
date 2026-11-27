import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Link from "@/app/components/link/Link";
import InlineText from "@/app/components/text/InlineText";
import { ARIA_ROLE } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import type { ExtraCardViewModel } from "../models/ExtraCardViewModel.interface";
import {
  EXTRA_CARD_BODY_CLASS,
  EXTRA_CARD_CONTAINER_CLASS,
  EXTRA_CARD_EDIT_CUE_CLASS,
  EXTRA_CARD_EDIT_ICON_CLASS,
  EXTRA_CARD_FACTS_CLASS,
  EXTRA_CARD_HEADING_ROW_CLASS,
  EXTRA_CARD_NAME_BLOCK_CLASS,
  EXTRA_CARD_NAME_CLASS,
  EXTRA_CARD_STATUS_BLOCK_CLASS,
} from "../styles/ExtraCard.styles";
import ExtraCardActions from "./ExtraCardActions";
import ExtraCardCompatibility from "./ExtraCardCompatibility";
import ExtraCardOccupancy from "./ExtraCardOccupancy";
import ExtraCardPrices from "./ExtraCardPrices";
import ExtraCardStatusChip from "./ExtraCardStatusChip";

const ExtraCard = ({
  compatibilityLabel,
  hasCompatibility,
  name,
  occupancyLabel,
  status,
  prices,
  ...actionProps
}: ExtraCardViewModel): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={name}
    className={EXTRA_CARD_CONTAINER_CLASS}
  >
    <Link
      href={actionProps.editHref}
      ariaLabel={EXTRA_CATALOG_COPY.EDIT_CARD_LABEL(name)}
      className={EXTRA_CARD_BODY_CLASS[status]}
    >
      <div className={EXTRA_CARD_HEADING_ROW_CLASS}>
        <div className={EXTRA_CARD_NAME_BLOCK_CLASS}>
          <InlineText className={EXTRA_CARD_NAME_CLASS}>
            {name}
          </InlineText>
          <ExtraCardPrices prices={prices} />
        </div>
        <div className={EXTRA_CARD_STATUS_BLOCK_CLASS}>
          <ExtraCardStatusChip status={status} />
          <InlineText className={EXTRA_CARD_EDIT_CUE_CLASS}>
            {EXTRA_CATALOG_COPY.EDIT_LINK}
            <MaterialIcon
              name={MATERIAL_ICON_NAME.CHEVRON_RIGHT}
              className={EXTRA_CARD_EDIT_ICON_CLASS}
            />
          </InlineText>
        </div>
      </div>
      <div className={EXTRA_CARD_FACTS_CLASS}>
        <ExtraCardOccupancy label={occupancyLabel} />
        <ExtraCardCompatibility
          compatibilityLabel={compatibilityLabel}
          hasCompatibility={hasCompatibility}
        />
      </div>
    </Link>
    <ExtraCardActions {...actionProps} />
  </div>
);

export default ExtraCard;
