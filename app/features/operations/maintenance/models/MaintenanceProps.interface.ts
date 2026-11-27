import type { NullableUndefined } from "@/app/types";

export interface MaintenanceProps {
  searchParams?: Record<
    string,
    NullableUndefined<string | string[]>
  >;
}
