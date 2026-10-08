import type { NullableRef } from "@/app/types";
import type { FirstSignInError } from "@/app/utils/first-sign-in/models/FirstSignInError.interface";
import type { FirstSignInFormAction } from "./FirstSignInFormAction.type";

export interface FirstSignInAction {
  action: FirstSignInFormAction;
  dismiss: () => void;
  error: NullableRef<FirstSignInError>;
  isPending: boolean;
}
