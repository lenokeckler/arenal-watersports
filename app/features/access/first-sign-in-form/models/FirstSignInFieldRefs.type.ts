import type { RefObject } from "react";
import type { NullableRef } from "@/app/types";
import type { FirstSignInFocusField } from "./FirstSignInFocusField.type";

export type FirstSignInFieldRefs = Record<
  FirstSignInFocusField,
  RefObject<NullableRef<HTMLInputElement>>
>;
