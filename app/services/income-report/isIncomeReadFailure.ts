import { ChargesTruncatedError } from "@/app/services/income/ChargesTruncatedError";
import { RefundsTruncatedError } from "@/app/services/income/RefundsTruncatedError";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";

export const isIncomeReadFailure = (
  error: unknown
): boolean =>
  error instanceof SupabaseQueryError ||
  error instanceof ChargesTruncatedError ||
  error instanceof RefundsTruncatedError;
