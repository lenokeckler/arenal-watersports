import type { NullableRef } from "@/app/types";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import type { PasswordChangeFormAction } from "./PasswordChangeFormAction.type";

export interface FirstSignInAction {
  action: PasswordChangeFormAction;
  dismiss: () => void;
  error: NullableRef<PasswordChangeError>;
  isPending: boolean;
}
