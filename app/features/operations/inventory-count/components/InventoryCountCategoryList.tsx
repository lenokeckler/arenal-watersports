import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import Text from "@/app/components/text/Text";
import {
  BUTTON_TYPES,
  INVENTORY_TRACKING_MODE,
} from "@/app/constants";
import { INVENTORY_COUNT_COPY } from "../constants/InventoryCountCopy.constants";
import type { InventoryCountCategoryListProps } from "../models/InventoryCountCategoryListProps.interface";
import {
  INVENTORY_COUNT_BADGE_CLASS,
  INVENTORY_COUNT_CATEGORY_BUTTON_CLASS,
  INVENTORY_COUNT_CATEGORY_META_CLASS,
  INVENTORY_COUNT_CATEGORY_NAME_CLASS,
  INVENTORY_COUNT_LIST_CLASS,
} from "../styles/InventoryCount.styles";

const InventoryCountCategoryList = ({
  categories,
  form,
}: InventoryCountCategoryListProps): React.JSX.Element => (
  <ul
    aria-label={INVENTORY_COUNT_COPY.CATEGORIES_LABEL}
    className={INVENTORY_COUNT_LIST_CLASS}
  >
    {categories.map((category) => {
      const isDone = form.reviewedIds.has(category.id);
      const isActive =
        form.selectedCategory?.id === category.id;

      return (
        <li key={category.id}>
          <Button
            type={BUTTON_TYPES.BUTTON}
            variant={BUTTON.BASE}
            aria-current={isActive ? "true" : undefined}
            className={
              INVENTORY_COUNT_CATEGORY_BUTTON_CLASS[
                isActive ? "active" : "idle"
              ]
            }
            onClick={() => form.openCategory(category.id)}
          >
            <span>
              <Text
                className={
                  INVENTORY_COUNT_CATEGORY_NAME_CLASS
                }
              >
                {category.name}
              </Text>
              <Text
                className={
                  INVENTORY_COUNT_CATEGORY_META_CLASS
                }
              >
                {category.trackingMode ===
                INVENTORY_TRACKING_MODE.BY_UNIT
                  ? INVENTORY_COUNT_COPY.CATEGORY_UNITS(
                      category.units.length
                    )
                  : INVENTORY_COUNT_COPY.CATEGORY_QUANTITY}
              </Text>
            </span>
            <span
              className={
                INVENTORY_COUNT_BADGE_CLASS[
                  isDone ? "done" : "pending"
                ]
              }
            >
              {isDone
                ? INVENTORY_COUNT_COPY.CATEGORY_DONE
                : INVENTORY_COUNT_COPY.CATEGORY_PENDING}
            </span>
          </Button>
        </li>
      );
    })}
  </ul>
);

export default InventoryCountCategoryList;
