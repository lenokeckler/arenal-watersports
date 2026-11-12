import type { UnitListViewProps } from "../models/UnitListViewProps.interface";
import {
  DEFAULT_UNIT_CATEGORY,
  DEFAULT_UNIT_LIST_ITEM,
} from "./UnitList.constants";

export const DEFAULT_UNIT_LIST_VIEW_PROPS: UnitListViewProps =
  {
    category: DEFAULT_UNIT_CATEGORY,
    currentPage: 1,
    fetchFailed: false,
    pageCount: 1,
    units: [DEFAULT_UNIT_LIST_ITEM],
  };

export const buildUnitListViewProps = (
  overrides: Partial<UnitListViewProps> = {}
): UnitListViewProps => ({
  ...DEFAULT_UNIT_LIST_VIEW_PROPS,
  ...overrides,
});
