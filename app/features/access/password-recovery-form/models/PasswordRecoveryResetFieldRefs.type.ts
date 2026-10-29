import type { RefObject } from "react";
import type { NullableRef } from "@/app/types";
import type { PasswordRecoveryResetFocusField } from "./PasswordRecoveryResetFocusField.type";

export type PasswordRecoveryResetFieldRefs = Record<
  PasswordRecoveryResetFocusField,
  RefObject<NullableRef<HTMLInputElement>>
>;
