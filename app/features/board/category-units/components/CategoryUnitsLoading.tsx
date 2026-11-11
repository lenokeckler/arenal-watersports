import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { SCREEN_READER_ONLY_CLASS } from "@/app/styles/ScreenReader.styles";
import {
  CATEGORY_UNITS_SKELETON,
  CATEGORY_UNITS_SKELETON_INDEXES,
} from "../constants/CategoryUnits.constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import {
  CATEGORY_UNITS_LIST_CLASS,
  CATEGORY_UNITS_LIST_ITEM_CLASS,
  CATEGORY_UNITS_PAGE_CLASS,
} from "../styles/CategoryUnits.styles";
import { CATEGORY_UNITS_SKELETON_TITLE_CLASS } from "../styles/CategoryUnitsState.styles";
import CategoryUnitSkeletonRow from "./CategoryUnitSkeletonRow";
import CategoryUnitsBackLink from "./CategoryUnitsBackLink";

const CategoryUnitsLoading = (): React.JSX.Element => (
  <main
    className={CATEGORY_UNITS_PAGE_CLASS}
    aria-busy
  >
    <CategoryUnitsBackLink />
    <div className={CATEGORY_UNITS_SKELETON_TITLE_CLASS} />
    <Text
      role={ARIA_ROLE.STATUS}
      className={SCREEN_READER_ONLY_CLASS}
    >
      {CATEGORY_UNITS_COPY.LOADING_ANNOUNCEMENT}
    </Text>
    <div className={CATEGORY_UNITS_LIST_CLASS}>
      {CATEGORY_UNITS_SKELETON_INDEXES.map(
        (skeletonIndex) => (
          <div
            key={skeletonIndex}
            className={CATEGORY_UNITS_LIST_ITEM_CLASS}
          >
            <CategoryUnitSkeletonRow
              withDetail={
                skeletonIndex <
                CATEGORY_UNITS_SKELETON.DETAIL_ROW_COUNT
              }
            />
          </div>
        )
      )}
    </div>
  </main>
);

export default CategoryUnitsLoading;
