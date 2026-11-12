import type { RefObject } from "react";
import type { NullableRef } from "@/app/types";
import type { LoginFocusField } from "./LoginFocusField.type";

export type LoginFormFieldRefs = Record<
  LoginFocusField,
  RefObject<NullableRef<HTMLInputElement>>
>;
