import type { RESERVATION_DEPOSIT_DECISION_KIND } from "@/app/constants";
import type { ReservationDepositAmount } from "./ReservationDepositAmount.interface";

export type ReservationDepositDecision =
  | {
      kind: typeof RESERVATION_DEPOSIT_DECISION_KIND.DECLINED;
    }
  | ({
      kind: typeof RESERVATION_DEPOSIT_DECISION_KIND.RECEIVED;
    } & ReservationDepositAmount)
  | {
      kind: typeof RESERVATION_DEPOSIT_DECISION_KIND.UNDECIDED;
    };
