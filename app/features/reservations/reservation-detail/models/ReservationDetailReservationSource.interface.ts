import type { Database, NullableRef } from "@/app/types";
import type { ReservationDetailPricingSource } from "./ReservationDetailPricingSource.interface";
import type { ReservationDetailRecordedCharge } from "./ReservationDetailRecordedCharge.interface";

export interface ReservationDetailReservationSource extends Pick<
  Database["public"]["Tables"]["reservations"]["Row"],
  | "cancellation_reason"
  | "closed_at"
  | "code"
  | "created_at"
  | "created_by"
  | "customer_name"
  | "dispatched_at"
  | "duration_minutes"
  | "ends_at"
  | "id"
  | "parent_reservation_id"
  | "people_count"
  | "starts_at"
  | "status"
  | "type"
  | "updated_at"
  | "updated_by"
> {
  combo: NullableRef<{ name: string }>;
  refunds: {
    amount: number;
    currency: Database["public"]["Enums"]["currency_code"];
  }[];
  reservation_charges: ReservationDetailRecordedCharge[];
  reservation_dispatches: {
    category: NullableRef<{ name: string }>;
    category_id: string;
    closed_at: NullableRef<string>;
    dispatched_at: string;
    ends_at: NullableRef<string>;
    id: string;
  }[];
  reservation_guides: {
    worker_id: string;
  }[];
  reservation_items: {
    category: NullableRef<{ name: string }>;
    category_id: NullableRef<string>;
    dispatch_id: NullableRef<string>;
    extra: NullableRef<{ name: string }>;
    extra_id: NullableRef<string>;
    quantity: NullableRef<number>;
    unit: NullableRef<{
      category: NullableRef<{ name: string }>;
      code: string;
    }>;
    unit_id: NullableRef<string>;
  }[];
  reservation_pricing: NullableRef<ReservationDetailPricingSource>;
}
