import type { RefObject } from "react";
import type { NullableRef } from "@/app/types";
import type { PasswordRecoveryFieldChangeHandler } from "./PasswordRecoveryFieldChangeHandler.type";

export interface PasswordRecoveryFieldProps {
  error: NullableRef<string>;
  inputRef: RefObject<NullableRef<HTMLInputElement>>;
  isPending: boolean;
  onChange: PasswordRecoveryFieldChangeHandler;
  value: string;
}
