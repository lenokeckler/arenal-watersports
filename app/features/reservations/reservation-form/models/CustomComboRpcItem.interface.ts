import type { Json } from "@/app/types/database.types";

export interface CustomComboRpcItem extends Record<
  string,
  Json | undefined
> {
  category_id: string;
  quantity: number;
}
