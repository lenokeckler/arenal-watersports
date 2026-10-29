import type { RefObject } from "react";
import type { NullableRef } from "@/app/types";
import type { PasswordRecoveryRequestFocusField } from "./PasswordRecoveryRequestFocusField.type";

export type PasswordRecoveryRequestFieldRefs = Record<
  PasswordRecoveryRequestFocusField,
  RefObject<NullableRef<HTMLInputElement>>
>;
