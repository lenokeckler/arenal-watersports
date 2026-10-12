import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";
import type { NullableRef } from "@/app/types";

export interface LatestServerError {
  clear: () => number;
  error: NullableRef<SignInError>;
  settle: (
    submissionId: number,
    result: SignInError
  ) => boolean;
}
