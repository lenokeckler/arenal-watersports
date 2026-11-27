import Section from "@/app/components/section/Section";
import Text from "@/app/components/text/Text";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryConfigureStatusCardViewProps } from "../models/CategoryConfigureStatusCardViewProps.interface";
import {
  CATEGORY_CONFIGURE_STATUS_CARD_ACTIVE_HELP_CLASS,
  CATEGORY_CONFIGURE_STATUS_CARD_ACTIVE_LABEL_CLASS,
  CATEGORY_CONFIGURE_STATUS_CARD_ACTIVE_ROW_CLASS,
  CATEGORY_CONFIGURE_STATUS_CARD_ACTIVE_TEXT_CLASS,
  CATEGORY_CONFIGURE_STATUS_CARD_CHIPS_CLASS,
  CATEGORY_CONFIGURE_STATUS_CARD_CLASS,
  CATEGORY_CONFIGURE_STATUS_CARD_DETAIL_CLASS,
  CATEGORY_CONFIGURE_STATUS_CARD_LOCK_CLASS,
  CATEGORY_CONFIGURE_STATUS_CARD_LOCK_MODE_CLASS,
  CATEGORY_CONFIGURE_STATUS_CARD_MISSING_CLASS,
} from "../styles/CategoryConfigureStatusCard.styles";
import CategoryConfigureChip from "./CategoryConfigureChip";
import CategoryConfigureSwitch from "./CategoryConfigureSwitch";

const CategoryConfigureStatusCard = ({
  chips,
  detail,
  missingNote,
  isActive,
  trackingModeLabel,
  onToggleActive,
}: CategoryConfigureStatusCardViewProps): React.JSX.Element => (
  <Section className={CATEGORY_CONFIGURE_STATUS_CARD_CLASS}>
    <div
      className={CATEGORY_CONFIGURE_STATUS_CARD_CHIPS_CLASS}
    >
      {chips.map((chip) => (
        <CategoryConfigureChip
          key={chip.label}
          {...chip}
        />
      ))}
    </div>
    <Text
      className={
        CATEGORY_CONFIGURE_STATUS_CARD_DETAIL_CLASS
      }
    >
      {detail}
    </Text>
    {missingNote && (
      <Text
        className={
          CATEGORY_CONFIGURE_STATUS_CARD_MISSING_CLASS
        }
      >
        {missingNote}
      </Text>
    )}
    <div
      className={
        CATEGORY_CONFIGURE_STATUS_CARD_ACTIVE_ROW_CLASS
      }
    >
      <div
        className={
          CATEGORY_CONFIGURE_STATUS_CARD_ACTIVE_TEXT_CLASS
        }
      >
        <Text
          className={
            CATEGORY_CONFIGURE_STATUS_CARD_ACTIVE_LABEL_CLASS
          }
        >
          {CATEGORY_CONFIGURE_COPY.ACTIVE_LABEL}
        </Text>
        <Text
          className={
            CATEGORY_CONFIGURE_STATUS_CARD_ACTIVE_HELP_CLASS
          }
        >
          {CATEGORY_CONFIGURE_COPY.ACTIVE_HELP}
        </Text>
      </div>
      <CategoryConfigureSwitch
        ariaLabel={CATEGORY_CONFIGURE_COPY.ACTIVE_LABEL}
        isChecked={isActive}
        onToggle={onToggleActive}
      />
    </div>
    <div
      className={CATEGORY_CONFIGURE_STATUS_CARD_LOCK_CLASS}
    >
      <Text
        className={
          CATEGORY_CONFIGURE_STATUS_CARD_LOCK_MODE_CLASS
        }
      >
        {trackingModeLabel}
      </Text>
      <Text
        className={
          CATEGORY_CONFIGURE_STATUS_CARD_ACTIVE_HELP_CLASS
        }
      >
        {CATEGORY_CONFIGURE_COPY.MODE_LOCKED}
      </Text>
    </div>
  </Section>
);

export default CategoryConfigureStatusCard;
