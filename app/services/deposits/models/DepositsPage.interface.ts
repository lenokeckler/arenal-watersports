export interface DepositsPage<Item> {
  items: Item[];
  page: number;
  pageCount: number;
  totalCount: number;
}
