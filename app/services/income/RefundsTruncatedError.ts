import { REFUNDS_TRUNCATED_ERROR_MESSAGE } from "@/app/constants";

export class RefundsTruncatedError extends Error {
  constructor() {
    super(REFUNDS_TRUNCATED_ERROR_MESSAGE);
    this.name = "RefundsTruncatedError";
  }
}
