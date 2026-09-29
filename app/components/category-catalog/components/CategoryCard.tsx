import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { STRING, TitleVariant } from "@/app/constants";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import type { CategoryTrackingMode } from "../models/CategoryTrackingMode.type";
import {
  CATEGORY_CARD_GROUP_PREFIX_CLASS,
  CATEGORY_CARD_GROUP_ROW_CLASS,
  CATEGORY_CARD_NAME_CLASS,
  CATEGORY_CARD_NAME_ROW_CLASS,
  CATEGORY_CARD_STATUS_PILL_CLASS,
  CATEGORY_CARD_TRACKING_MODE_CLASS,
  resolveCategoryCardContainerClassName,
} from "../styles/CategoryCard.styles";
import CategoryCardActions from "./CategoryCardActions";

const CATEGORY_TRACKING_MODE_MICRO_LABEL: Record<
  CategoryTrackingMode,
  string
> = {
  [CATEGORY_TRACKING_MODE.BY_QUANTITY]:
    CATEGORY_CATALOG_COPY.TRACKING_MODE_MICRO_LABEL_BY_QUANTITY,
  [CATEGORY_TRACKING_MODE.BY_UNIT]:
    CATEGORY_CATALOG_COPY.TRACKING_MODE_MICRO_LABEL_BY_UNIT,
};

const CategoryCard = ({
  category,
  ...cardActionProps
}: CategoryCardViewModel): React.JSX.Element => {
  const isInactive =
    category.status === CATEGORY_STATUS.INACTIVE;
  const isConfirmingDelete =
    cardActionProps.actionState ===
    CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE;
  const groupPrefixLabel = [
    CATEGORY_CATALOG_COPY.GROUP_PREFIX_LABEL,
    STRING.MIDDLE_DOT,
  ].join(STRING.SPACE);

  return (
    <div
      className={resolveCategoryCardContainerClassName(
        isInactive,
        isConfirmingDelete
      )}
    >
      <div className={CATEGORY_CARD_NAME_ROW_CLASS}>
        <Title
          variant={TitleVariant.AUXILIAR}
          text={category.name}
          className={CATEGORY_CARD_NAME_CLASS}
        />
        {isInactive && (
          <InlineText
            className={CATEGORY_CARD_STATUS_PILL_CLASS}
          >
            {CATEGORY_CATALOG_COPY.STATUS_PILL_INACTIVE}
          </InlineText>
        )}
      </div>
      <Text className={CATEGORY_CARD_TRACKING_MODE_CLASS}>
        {
          CATEGORY_TRACKING_MODE_MICRO_LABEL[
            category.trackingMode
          ]
        }
      </Text>
      {category.groupName && (
        <Text className={CATEGORY_CARD_GROUP_ROW_CLASS}>
          <InlineText
            className={CATEGORY_CARD_GROUP_PREFIX_CLASS}
          >
            {groupPrefixLabel}
          </InlineText>
          {STRING.SPACE}
          {category.groupName}
        </Text>
      )}
      <CategoryCardActions
        actionState={cardActionProps.actionState}
        isActionLoading={cardActionProps.isActionLoading}
        onCancelClick={cardActionProps.onCancelClick}
        onConfirmDeleteClick={
          cardActionProps.onConfirmDeleteClick
        }
        onDeleteClick={cardActionProps.onDeleteClick}
        onMarkInactiveClick={
          cardActionProps.onMarkInactiveClick
        }
      />
    </div>
  );
};

export default CategoryCard;
