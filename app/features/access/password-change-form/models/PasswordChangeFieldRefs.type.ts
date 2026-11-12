import type { RefObject } from "react";
import type { NullableRef } from "@/app/types";
import type { PasswordChangeFocusField } from "./PasswordChangeFocusField.type";

export type PasswordChangeFieldRefs = Record<
  PasswordChangeFocusField,
  RefObject<NullableRef<HTMLInputElement>>
>;
