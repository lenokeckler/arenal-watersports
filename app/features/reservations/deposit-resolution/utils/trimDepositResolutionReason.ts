import { STRING } from "@/app/constants";
import { DEPOSIT_RESOLUTION_REASON_EDGE_PATTERN } from "../constants/DepositResolutionReasonPatterns.constants";

export const trimDepositResolutionReason = (
  text: string
): string =>
  text.replace(
    DEPOSIT_RESOLUTION_REASON_EDGE_PATTERN,
    STRING.Empty
  );
