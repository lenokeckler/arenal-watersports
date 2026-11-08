import {
  CATEGORY_UNITS_SKELETON_CHIP_CLASS,
  CATEGORY_UNITS_SKELETON_CODE_CLASS,
  CATEGORY_UNITS_SKELETON_ROW_CLASS,
} from "../styles/CategoryUnitsState.styles";

const CategoryUnitSkeletonRow = (): React.JSX.Element => (
  <div className={CATEGORY_UNITS_SKELETON_ROW_CLASS}>
    <div className={CATEGORY_UNITS_SKELETON_CODE_CLASS} />
    <div className={CATEGORY_UNITS_SKELETON_CHIP_CLASS} />
  </div>
);

export default CategoryUnitSkeletonRow;
