import { NON_FINITE_AMOUNT_ERROR_MESSAGE } from "@/app/constants";

export class NonFiniteAmountError extends Error {
  constructor() {
    super(NON_FINITE_AMOUNT_ERROR_MESSAGE);
    this.name = "NonFiniteAmountError";
  }
}
