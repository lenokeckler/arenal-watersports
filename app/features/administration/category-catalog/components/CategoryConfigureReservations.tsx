import Text from "@/app/components/text/Text";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryConfigureReservationsProps } from "../models/CategoryConfigureReservationsProps.interface";
import {
  CATEGORY_CONFIGURE_RESERVATIONS_CLASS,
  CATEGORY_CONFIGURE_RESERVATIONS_DURATION_CLASS,
  CATEGORY_CONFIGURE_RESERVATIONS_HELP_CLASS,
  CATEGORY_CONFIGURE_RESERVATIONS_LABEL_CLASS,
} from "../styles/CategoryConfigureReservations.styles";
import CategoryBehaviorDurationField from "./CategoryBehaviorDurationField";
import CategoryConfigureSwitchRow from "./CategoryConfigureSwitchRow";
import CategoryDurationChips from "./CategoryDurationChips";

const CategoryConfigureReservations = ({
  isReservable,
  isGuideOnly,
  durationText,
  durationError,
  durationChips,
  onToggleReservable,
  onToggleGuideOnly,
  onDurationChange,
}: CategoryConfigureReservationsProps): React.JSX.Element => (
  <div className={CATEGORY_CONFIGURE_RESERVATIONS_CLASS}>
    <CategoryConfigureSwitchRow
      label={CATEGORY_CONFIGURE_COPY.BOOKABLE_LABEL}
      help={CATEGORY_CONFIGURE_COPY.BOOKABLE_HELP}
      isChecked={isReservable}
      onToggle={onToggleReservable}
    />
    {isReservable && (
      <>
        <div
          className={
            CATEGORY_CONFIGURE_RESERVATIONS_DURATION_CLASS
          }
        >
          <Text
            className={
              CATEGORY_CONFIGURE_RESERVATIONS_LABEL_CLASS
            }
          >
            {CATEGORY_CONFIGURE_COPY.DURATION_LABEL}
          </Text>
          <CategoryDurationChips {...durationChips} />
          {durationChips.isOtherSelected && (
            <CategoryBehaviorDurationField
              value={durationText}
              error={durationError}
              disabled={false}
              onChange={onDurationChange}
            />
          )}
          <Text
            className={
              CATEGORY_CONFIGURE_RESERVATIONS_HELP_CLASS
            }
          >
            {CATEGORY_CONFIGURE_COPY.DURATION_HELP}
          </Text>
        </div>
        <CategoryConfigureSwitchRow
          label={CATEGORY_CONFIGURE_COPY.GUIDE_ONLY_LABEL}
          help={CATEGORY_CONFIGURE_COPY.GUIDE_ONLY_HELP}
          isChecked={isGuideOnly}
          onToggle={onToggleGuideOnly}
        />
      </>
    )}
  </div>
);

export default CategoryConfigureReservations;
