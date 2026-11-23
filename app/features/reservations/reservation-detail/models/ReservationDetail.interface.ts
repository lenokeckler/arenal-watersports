import type { Database, NullableRef } from "@/app/types";
import type { ReservationDetailCharge } from "./ReservationDetailCharge.interface";
import type { ReservationDetailDispatch } from "./ReservationDetailDispatch.interface";
import type { ReservationDetailEquipment } from "./ReservationDetailEquipment.interface";
import type { ReservationDetailExtraTimeCharge } from "./ReservationDetailExtraTimeCharge.interface";
import type { ReservationDetailRefund } from "./ReservationDetailRefund.interface";
import type { ReservationDetailExtra } from "./ReservationDetailExtra.interface";
import type { ReservationDetailGuide } from "./ReservationDetailGuide.interface";
import type { ReservationDetailMoneyMovement } from "./ReservationDetailMoneyMovement.interface";
import type { ReservationDepositDecision } from "@/app/utils/reservations/models/ReservationDepositDecision.type";
import type { ReservationRefundableAmount } from "@/app/utils/reservations/models/ReservationRefundableAmount.interface";
import type { ReservationDetailChargeStatus } from "../constants/ReservationDetail.constants";

export interface ReservationDetail extends Pick<
  Database["public"]["Tables"]["reservations"]["Row"],
  | "cancellation_reason"
  | "closed_at"
  | "code"
  | "created_at"
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
> {
  chargeStatus: ReservationDetailChargeStatus;
  charges: ReservationDetailCharge[];
  comboName: NullableRef<string>;
  createdByName: NullableRef<string>;
  deposit: ReservationDepositDecision;
  dispatches: ReservationDetailDispatch[];
  equipment: ReservationDetailEquipment[];
  extraTimeCharges: ReservationDetailExtraTimeCharge[];
  refundable: ReservationRefundableAmount[];
  refunds: ReservationDetailRefund[];
  extras: ReservationDetailExtra[];
  guides: ReservationDetailGuide[];
  moneyMovements: ReservationDetailMoneyMovement[];
  updatedByName: NullableRef<string>;
}

export type ReservationDetailResult =
  NullableRef<ReservationDetail>;
