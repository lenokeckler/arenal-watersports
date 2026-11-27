import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Link from "@/app/components/link/Link";
import InlineText from "@/app/components/text/InlineText";
import type { ExtraCompatibilityCategoryCardsProps } from "../models/ExtraCompatibilityCategoryCardsProps.interface";
import {
  EXTRA_COMPATIBILITY_CARDS_CLASS,
  EXTRA_COMPATIBILITY_CATEGORY_ICON_CLASS,
  EXTRA_COMPATIBILITY_CATEGORY_LINK_CLASS,
  EXTRA_COMPATIBILITY_CATEGORY_NAME_CLASS,
  EXTRA_COMPATIBILITY_CATEGORY_PROGRESS_CLASS,
  EXTRA_COMPATIBILITY_CATEGORY_TEXT_CLASS,
} from "../styles/ExtraCompatibility.styles";

const ExtraCompatibilityCategoryCards = ({
  cards,
}: ExtraCompatibilityCategoryCardsProps): React.JSX.Element => (
  <div className={EXTRA_COMPATIBILITY_CARDS_CLASS}>
    {cards.map((card) => (
      <Link
        key={card.id}
        href={card.href}
        className={EXTRA_COMPATIBILITY_CATEGORY_LINK_CLASS}
      >
        <div
          className={
            EXTRA_COMPATIBILITY_CATEGORY_TEXT_CLASS
          }
        >
          <InlineText
            className={
              EXTRA_COMPATIBILITY_CATEGORY_NAME_CLASS
            }
          >
            {card.name}
          </InlineText>
          <InlineText
            className={
              EXTRA_COMPATIBILITY_CATEGORY_PROGRESS_CLASS
            }
          >
            {card.progressLabel}
          </InlineText>
        </div>
        <MaterialIcon
          name={MATERIAL_ICON_NAME.CHEVRON_RIGHT}
          className={
            EXTRA_COMPATIBILITY_CATEGORY_ICON_CLASS
          }
        />
      </Link>
    ))}
  </div>
);

export default ExtraCompatibilityCategoryCards;
