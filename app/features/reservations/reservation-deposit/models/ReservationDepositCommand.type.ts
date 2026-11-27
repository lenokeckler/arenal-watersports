import type { CurrencyCode } from "@/app/constants";

export type ReservationDepositCommand =
  | {
      hasDeposit: false;
      reservationId: string;
    }
  | {
      amount: number;
      currency: CurrencyCode;
      hasDeposit: true;
      reservationId: string;
    };
