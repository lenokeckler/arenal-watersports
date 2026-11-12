import { CURRENCY_CODE } from "@/app/constants";
import type { ReservationChargeProposal } from "../models/ReservationChargeProposal.type";

export const RESERVATION_CHARGE_NO_PROPOSAL: ReservationChargeProposal =
  {
    [CURRENCY_CODE.CRC]: null,
    [CURRENCY_CODE.USD]: null,
  };
