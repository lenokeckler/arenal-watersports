export interface InventoryPage<TItem> {
  items: TItem[];
  pageIndex: number;
  pageCount: number;
  totalCount: number;
}
