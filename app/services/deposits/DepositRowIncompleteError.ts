import { DEPOSIT_ROW_INCOMPLETE_ERROR_MESSAGE } from "@/app/constants";

export class DepositRowIncompleteError extends Error {
  constructor() {
    super(DEPOSIT_ROW_INCOMPLETE_ERROR_MESSAGE);
    this.name = "DepositRowIncompleteError";
  }
}
