import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import {
  CATEGORY_CARD_ACTIONS_ROW_CLASS,
  CATEGORY_CARD_ROW_CLASS,
  resolveCategoryCardContainerClassName,
} from "../styles/CategoryCard.styles";
import CategoryCardEditButton from "./CategoryCardEditButton";
import CategoryCardPanel from "./CategoryCardPanel";
import CategoryCardStatusChip from "./CategoryCardStatusChip";
import CategoryCardSummary from "./CategoryCardSummary";

const CategoryCard = ({
  category,
  isInactive,
  isPanelOpen,
  onTogglePanelClick,
  panelId,
  subtitle,
  ...actionProps
}: CategoryCardViewModel): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={category.name}
    className={resolveCategoryCardContainerClassName(
      actionProps.actionState ===
        CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE
    )}
  >
    <div className={CATEGORY_CARD_ROW_CLASS}>
      <CategoryCardSummary
        name={category.name}
        subtitle={subtitle}
        groupName={category.groupName}
        isInactive={isInactive}
      />
      <div className={CATEGORY_CARD_ACTIONS_ROW_CLASS}>
        <CategoryCardStatusChip status={category.status} />
        <CategoryCardEditButton
          isOpen={isPanelOpen}
          panelId={panelId}
          onClick={onTogglePanelClick}
        />
      </div>
    </div>
    {isPanelOpen && (
      <CategoryCardPanel
        category={category}
        panelId={panelId}
        {...actionProps}
      />
    )}
  </div>
);

export default CategoryCard;
