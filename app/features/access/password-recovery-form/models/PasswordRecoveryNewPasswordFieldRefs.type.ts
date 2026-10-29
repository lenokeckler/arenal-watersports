import type { RefObject } from "react";
import type { NullableRef } from "@/app/types";
import type { PasswordRecoveryNewPasswordFocusField } from "./PasswordRecoveryNewPasswordFocusField.type";

export type PasswordRecoveryNewPasswordFieldRefs = Record<
  PasswordRecoveryNewPasswordFocusField,
  RefObject<NullableRef<HTMLInputElement>>
>;
