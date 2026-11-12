export interface InventoryExpiryAlert {
  anticipationDays: number;
  categoryId: string;
  categoryName: string;
  daysToExpiry: number;
  expiryDate: string;
  isExpired: boolean;
}
