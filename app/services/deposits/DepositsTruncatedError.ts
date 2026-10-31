import { DEPOSITS_TRUNCATED_ERROR_MESSAGE } from "@/app/constants";

export class DepositsTruncatedError extends Error {
  constructor() {
    super(DEPOSITS_TRUNCATED_ERROR_MESSAGE);
    this.name = "DepositsTruncatedError";
  }
}
