export interface InventoryPaginationProps {
  pageIndex: number;
  pageCount: number;
  pagePath: (pageIndex: number) => string;
}
