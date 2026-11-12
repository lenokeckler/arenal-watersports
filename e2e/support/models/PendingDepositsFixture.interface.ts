import type { E2eSeededDeposit } from "./E2eSeededDeposit.interface";

export interface PendingDepositsFixture {
  crc: E2eSeededDeposit;
  returned: E2eSeededDeposit;
  usd: E2eSeededDeposit;
}
