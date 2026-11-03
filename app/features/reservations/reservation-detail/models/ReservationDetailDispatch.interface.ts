import type { NullableRef } from "@/app/types";

export interface ReservationDetailDispatch {
  actualArrivalAt: NullableRef<string>;
  actualDepartureAt: string;
  categoryName: NullableRef<string>;
  expectedReturnAt: NullableRef<string>;
  id: string;
  unitCodes: string[];
}
