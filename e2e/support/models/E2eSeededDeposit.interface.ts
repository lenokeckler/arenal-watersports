import type { E2eDepositSeed } from "./E2eDepositSeed.interface";

export interface E2eSeededDeposit extends E2eDepositSeed {
  customerName: string;
  depositId: string;
  reservationCode: string;
  reservationId: string;
}
