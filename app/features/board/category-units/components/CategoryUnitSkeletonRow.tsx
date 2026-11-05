import type { CategoryUnitSkeletonRowProps } from "../models/CategoryUnitSkeletonRowProps.interface";
import {
  CATEGORY_UNITS_SKELETON_CHIP_CLASS,
  CATEGORY_UNITS_SKELETON_CODE_CLASS,
  CATEGORY_UNITS_SKELETON_DETAIL_CLASS,
  CATEGORY_UNITS_SKELETON_HEADER_CLASS,
  CATEGORY_UNITS_SKELETON_LINE_CLASS,
  CATEGORY_UNITS_SKELETON_RETURN_CLASS,
  CATEGORY_UNITS_SKELETON_ROW_CLASS,
} from "../styles/CategoryUnitsState.styles";

const CategoryUnitSkeletonRow = ({
  withDetail,
}: CategoryUnitSkeletonRowProps): React.JSX.Element => (
  <div className={CATEGORY_UNITS_SKELETON_ROW_CLASS}>
    <div className={CATEGORY_UNITS_SKELETON_HEADER_CLASS}>
      <div className={CATEGORY_UNITS_SKELETON_CODE_CLASS} />
      <div className={CATEGORY_UNITS_SKELETON_CHIP_CLASS} />
    </div>
    {withDetail && (
      <div className={CATEGORY_UNITS_SKELETON_DETAIL_CLASS}>
        <div
          className={CATEGORY_UNITS_SKELETON_RETURN_CLASS}
        />
        <div
          className={CATEGORY_UNITS_SKELETON_LINE_CLASS}
        />
        <div
          className={CATEGORY_UNITS_SKELETON_LINE_CLASS}
        />
      </div>
    )}
  </div>
);

export default CategoryUnitSkeletonRow;
