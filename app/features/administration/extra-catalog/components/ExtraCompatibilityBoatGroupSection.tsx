import Button from "@/app/components/button/Button";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Section from "@/app/components/section/Section";
import InlineText from "@/app/components/text/InlineText";
import {
  BUTTON,
  BUTTON_TYPES,
  LENGTH,
} from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import type { ExtraCompatibilityBoatGroupSectionProps } from "../models/ExtraCompatibilityBoatGroupSectionProps.interface";
import {
  EXTRA_BOATS_GROUP_BODY_CLASS,
  EXTRA_BOATS_GROUP_CLASS,
  EXTRA_BOATS_GROUP_COUNT_CLASS,
  EXTRA_BOATS_GROUP_HEADER_CLASS,
  EXTRA_BOATS_GROUP_HEADER_TEXT_CLASS,
  EXTRA_BOATS_GROUP_MARKED_CLASS,
  EXTRA_BOATS_GROUP_NAME_CLASS,
  resolveExtraBoatsGroupChevronClassName,
} from "../styles/ExtraCompatibilityBoats.styles";
import ExtraCompatibilityUnitsHelpers from "./ExtraCompatibilityUnitsHelpers";
import ExtraCompatibilityUnitsList from "./ExtraCompatibilityUnitsList";

const ExtraCompatibilityBoatGroupSection = ({
  group,
  isSubmitting,
}: ExtraCompatibilityBoatGroupSectionProps): React.JSX.Element => {
  const bodyId = `${group.id}-units`;

  return (
    <Section
      aria-label={group.name}
      className={EXTRA_BOATS_GROUP_CLASS}
    >
      <Button
        variant={BUTTON.BASE}
        type={BUTTON_TYPES.BUTTON}
        aria-expanded={group.isOpen}
        aria-controls={bodyId}
        onClick={group.onToggleOpen}
        className={EXTRA_BOATS_GROUP_HEADER_CLASS}
      >
        <InlineText
          className={EXTRA_BOATS_GROUP_HEADER_TEXT_CLASS}
        >
          <InlineText
            className={EXTRA_BOATS_GROUP_NAME_CLASS}
          >
            {group.name}
          </InlineText>
          <InlineText
            className={EXTRA_BOATS_GROUP_COUNT_CLASS}
          >
            {group.progressLabel}
          </InlineText>
        </InlineText>
        {group.markedCount > LENGTH.ZERO ? (
          <InlineText
            className={EXTRA_BOATS_GROUP_MARKED_CLASS}
          >
            {EXTRA_COMPATIBILITY_COPY.MARKED_COUNT(
              group.markedCount
            )}
          </InlineText>
        ) : null}
        <MaterialIcon
          name={MATERIAL_ICON_NAME.EXPAND_MORE}
          className={resolveExtraBoatsGroupChevronClassName(
            group.isOpen
          )}
        />
      </Button>
      {group.isOpen ? (
        <div
          id={bodyId}
          className={EXTRA_BOATS_GROUP_BODY_CLASS}
        >
          <ExtraCompatibilityUnitsHelpers
            isSubmitting={isSubmitting}
            onClearAll={group.onClearAll}
            onSelectAll={group.onSelectAll}
          />
          <ExtraCompatibilityUnitsList
            isSubmitting={isSubmitting}
            onToggleUnit={group.onToggleUnit}
            options={group.options}
          />
        </div>
      ) : null}
    </Section>
  );
};

export default ExtraCompatibilityBoatGroupSection;
