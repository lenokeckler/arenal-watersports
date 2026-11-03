import Link from "@/app/components/link/Link";
import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { ARIA_ROLE, TitleVariant } from "@/app/constants";
import { UNIT_LIST_COPY } from "../constants/UnitListCopy.constants";
import type { UnitCardViewModel } from "../models/UnitCardViewModel.interface";
import {
  resolveUnitCardContainerClassName,
  UNIT_CARD_ACTIONS_CLASS,
  UNIT_CARD_CODE_CLASS,
  UNIT_CARD_DETAIL_CLASS,
  UNIT_CARD_DETAILS_CLASS,
  UNIT_CARD_HEADING_ROW_CLASS,
  UNIT_CARD_STATUS_CHIP_CLASS,
} from "../styles/UnitCard.styles";
import { UNIT_LIST_LINK_CLASS } from "../styles/UnitListLink.styles";

const UnitCard = ({
  code,
  editHref,
  fuelText,
  isDimmed,
  oilChangeText,
  statusLabel,
  usageText,
}: UnitCardViewModel): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={code}
    className={resolveUnitCardContainerClassName(isDimmed)}
  >
    <div className={UNIT_CARD_HEADING_ROW_CLASS}>
      <Title
        variant={TitleVariant.AUXILIAR}
        text={code}
        className={UNIT_CARD_CODE_CLASS}
      />
      <InlineText className={UNIT_CARD_STATUS_CHIP_CLASS}>
        {statusLabel}
      </InlineText>
    </div>
    <div className={UNIT_CARD_DETAILS_CLASS}>
      {[fuelText, usageText, oilChangeText].map(
        (detailText) =>
          detailText && (
            <Text
              key={detailText}
              className={UNIT_CARD_DETAIL_CLASS}
            >
              {detailText}
            </Text>
          )
      )}
    </div>
    {editHref && (
      <div className={UNIT_CARD_ACTIONS_CLASS}>
        <Link
          href={editHref}
          className={UNIT_LIST_LINK_CLASS}
        >
          {UNIT_LIST_COPY.EDIT_LINK}
        </Link>
      </div>
    )}
  </div>
);

export default UnitCard;
