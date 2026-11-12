import type { E2eSeededDeposit } from "./E2eSeededDeposit.interface";

export interface DepositsReportFixture {
  blankReason: E2eSeededDeposit;
  heldCrc: E2eSeededDeposit;
  heldUsd: E2eSeededDeposit;
  partialCrc: E2eSeededDeposit;
  retainedUsd: E2eSeededDeposit;
}
