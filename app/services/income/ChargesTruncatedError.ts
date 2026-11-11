import { CHARGES_TRUNCATED_ERROR_MESSAGE } from "@/app/constants";

export class ChargesTruncatedError extends Error {
  constructor() {
    super(CHARGES_TRUNCATED_ERROR_MESSAGE);
    this.name = "ChargesTruncatedError";
  }
}
