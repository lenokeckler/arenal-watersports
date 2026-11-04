import type { CategoryListViewProps } from "./CategoryListViewProps.interface";

export type CategoryListViewModelProps = Pick<
  CategoryListViewProps,
  "categories" | "fetchFailed"
>;
